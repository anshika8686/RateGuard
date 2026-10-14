
const path = require("path");
const fs = require("fs");

require("dotenv").config({
    path: path.join(__dirname, "..",".env")
});

const redisClient = require("../src/config/redis.client");

async function main() {
    try {
        // Step 1: Verify that the Redis URL is loaded
        console.log(
            "Redis URL loaded:",
            Boolean(process.env.REDIS_URL)
        );

        if (!process.env.REDIS_URL) {
            throw new Error(
                "REDIS_URL is missing from gateway/.env"
            );
        }

        // Print only the hostname, never the credentials
        console.log(
            "Redis host:",
            new URL(process.env.REDIS_URL).hostname
        );

        // Step 2: Connect to Redis
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        console.log("Redis connected successfully!");

        // Step 3: Load the Lua script
        const scriptPath = path.join(
            __dirname,
            "..",
            "src",
            "scripts",
            "tokenBucket.lua"
        );

        const script = fs.readFileSync(scriptPath, "utf8");

        // Step 4: Create a unique test bucket
        const testKey = `bucket:test-${Date.now()}`;

        // Step 5: Execute the Token Bucket script
        const result = await redisClient.eval(script, {
            keys: [testKey],
            arguments: [
                "5",                // Capacity
                "1",                // Refill rate: 1 token/second
                String(Date.now()), // Current timestamp in milliseconds
                "10"                // TTL: 10 seconds for this test
            ]
        });

        // Step 6: Display the result
        console.log("\n--- Token Bucket Test ---");
        console.log("Allowed:", Number(result[0]) === 1);
        console.log("Remaining tokens:", Number(result[1]));

        // Step 7: Verify the state saved in Redis
        const savedBucket = await redisClient.hGetAll(testKey);

        console.log("Saved Redis bucket:", savedBucket);

        // Step 8: Clean up the test key
        await redisClient.del(testKey);
        console.log("Test bucket cleaned up.");

    } catch (error) {
        console.error("Token bucket test failed:", error.message);
    } finally {
        // Close this test process's Redis connection
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    }
}

main();
