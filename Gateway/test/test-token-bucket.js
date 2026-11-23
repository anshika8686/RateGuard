const path = require("path");
const fs = require("fs");

require("dotenv").config({
    path: path.join(__dirname, "..",".env")
});

const redisClient = require("../src/config/redis.client");

async function main() {
    const testKey = `bucket:test-${Date.now()}`;

    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        const scriptPath = path.join(
            __dirname,
            "..",
            "src",
            "scripts",
            "tokenBucket.lua"
        );

        const script = fs.readFileSync(scriptPath, "utf8");

       const fixedNow = Date.now();

async function makeRequest(now = Date.now()) {
    return redisClient.eval(script, {
        keys: [testKey],
        arguments: [
            "3",
            "1",
            String(now),
            "10"
        ]
    });
}

        console.log("\n--- Token Bucket Test ---");

        for (let i = 1; i <= 4; i++) {
            const result = await makeRequest(fixedNow);

            console.log(
                `Request ${i}:`,
                Number(result[0]) === 1 ? "ALLOWED" : "REJECTED",
                "| Remaining tokens:",
                result[1]
            );
        }

        console.log("\nWaiting 1.2 seconds for refill...");
        await new Promise(resolve => setTimeout(resolve, 1200));

        const refillResult = await makeRequest();

        console.log(
            "After refill:",
            Number(refillResult[0]) === 1 ? "ALLOWED" : "REJECTED",
            "| Remaining tokens:",
            refillResult[1]
        );
    } catch (error) {
        console.error("Token bucket test failed:", error.message);
    } finally {
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    }
}
main();
