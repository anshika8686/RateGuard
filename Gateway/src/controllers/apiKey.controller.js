const ApiKeyModel = require("../models/apiKey.model");

const {
    generateKey,
    hashApiKey
} = require("../services/apiKey.service");

const createApiKeyController = async (req, res) => {
    const userId=req.user.id
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
            userId: userId,
            name:name,
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

const fetchApiKeyController=async(req,res)=>{
    try {
        const userId = req.user.id;

        const apiKeys = await ApiKeyModel.find({
            userId: userId
        })
        .select("_id name keyPrefix rateLimit active createdAt")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: apiKeys.length,
            apiKeys
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch API keys"
        });
    }
};

module.exports = {
    createApiKeyController,
    fetchApiKeyController,
};
