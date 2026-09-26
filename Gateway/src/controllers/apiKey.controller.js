const ApiKeyModel = require("../models/apiKey.model");

const {
    generateKey,
    hashApiKey
} = require("../services/apiKey.service");

const createApiKeyController = async (req, res) => {
    try {
        const { name, rateLimit } = req.body;

        if (!name || !rateLimit) {
            return res.status(400).json({
                message: "Name or RateLimit does not exist"
            });
        }

        const apiKey = generateKey();

        const keyHash = hashApiKey(apiKey);

        const newApiKey = await ApiKeyModel.create({
            name: name,
            keyHash: keyHash,
            keyPrefix: apiKey.substring(0, 7),
            rateLimit: rateLimit,
            active: true
        });

        return res.status(201).json({
            id: newApiKey._id,
            name: newApiKey.name,
            apiKey,
            rateLimit: newApiKey.rateLimit
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to generate API key"
        });
    }
};

module.exports = {
    createApiKeyController
};
