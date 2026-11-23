
const ApiKeyModel = require("../models/apiKey.model");
const RequestLogModel = require("../models/requestLog.model");

async function getUserDashboardController(req, res) {
    try {
        const userId = req.user.id;

        // Find API keys belonging to the logged-in user
        const apiKeys = await ApiKeyModel.find({ userId }).select("_id");

        const apiKeyIds = apiKeys.map((key) => key._id);

        // Calculate request statistics only for these API keys
        const result = await RequestLogModel.aggregate([
            {
                $match: {
                    clientId: { $in: apiKeyIds }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRequests: { $sum: 1 },

                    successfulRequests: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $gte: ["$status_code", 200] },
                                        { $lt: ["$status_code", 300] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },

                    rateLimitedRequests: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status_code", 429] },
                                1,
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        const stats = result[0] || {
            totalRequests: 0,
            successfulRequests: 0,
            rateLimitedRequests: 0
        };

        return res.status(200).json({
            success: true,
            data: {
                totalApiKeys: apiKeys.length,
                totalRequests: stats.totalRequests,
                successfulRequests: stats.successfulRequests,
                rateLimitedRequests: stats.rateLimitedRequests
            }
        });

    } catch (error) {
        console.error("User dashboard error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard overview"
        });
    }
}

module.exports = {
    getUserDashboardController
};
