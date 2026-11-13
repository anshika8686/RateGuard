
const axios = require('axios');

async function proxyController(req, res) {
    console.log("Forwarding to:", `http://localhost:3000${req.originalUrl}`);

    try {
        const response = await axios({
            method: req.method,
            url: `http://localhost:3000${req.originalUrl}`,
            headers: {
                "Content-Type": req.headers["content-type"]
            },
            data: req.body,
            timeout: 5000
        });

        return res.status(response.status).json(response.data);

    } catch (error) {
        console.error("Proxy error:", error.message);
        console.error("Backend status:", error.response?.status);
        console.error("Backend response:", error.response?.data);

        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        if (error.code === "ECONNABORTED") {
            return res.status(504).json({
                message: "Backend request timed out"
            });
        }

        return res.status(502).json({
            message: "Backend service unavailable"
        });
    }
}

module.exports = proxyController;
