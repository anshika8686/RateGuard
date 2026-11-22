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

const updateApiKeyController=async(req,res)=>{
     try {
        const { id } = req.params;
        const { active } = req.body;

        // Validate active status
        if (typeof active !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Active must be true or false"
            });
        }

        // Find and update only the logged-in user's API key
        const updatedApiKey = await ApiKeyModel.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.id
            },
            {
                $set: { active: active }//set active with the new value
            },
            {
                new: true,
                runValidators: true
            }
        ).select("_id name keyPrefix rateLimit active createdAt");

        if (!updatedApiKey) {
            return res.status(404).json({
                success: false,
                message: "API key not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "API key status updated successfully",
            apiKey: updatedApiKey
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update API key"
        });
    }

}

const deleteApiKeyController=async(req,res)=>{
    
}
module.exports = {
    createApiKeyController,
    fetchApiKeyController,
    updateApiKeyController,
};
