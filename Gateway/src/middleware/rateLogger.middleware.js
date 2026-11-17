
const { saveRequestLog } = require("../services/requestLog.service");

function requestLogger(req, res, next) {

    const startTime = Date.now();

    res.on("finish", async () => { //event listener is triggered

        const logData = {
            endpoint: req.originalUrl,
            method: req.method,
            status_code: res.statusCode,
            responseTime: Date.now() - startTime
        };

        if (req.client?._id) {
            logData.clientId = req.client._id;
        }
        
        await saveRequestLog(logData);
    });

    next();
}

module.exports = requestLogger;
