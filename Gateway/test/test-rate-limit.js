
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "..", ".env")
});

const redisClient = require("../src/config/redis.client");
const { checkRateLimit } = require("../src/services/rateLimiter.service");

async function main() {
    // Mock client: 3 requests allowed initially, with refill over time
    const client = {
        _id: "test-client-001",
        rateLimit: 3
    };

    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        console.log("--- Rate Limiter Service Test ---");

        for (let i = 1; i <= 5; i++) {
            const result = await checkRateLimit(client);

            console.log(
                `Request ${i}:`,
                result.allowed ? "ALLOWED" : "REJECTED",
                "| Remaining tokens:",
                result.remainingTokens
            );
        }
    } catch (error) {
        console.error("Service test failed:", error.message);
    } finally {
        // Clean up the test bucket
        try {
            await redisClient.del("bucket:test-client-001");
        } catch (error) {
            console.error("Cleanup failed:", error.message);
        }

        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    }
}

main();
