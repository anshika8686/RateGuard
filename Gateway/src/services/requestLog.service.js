const RequestLogModel=require("../models/requestLog.model")
async function saveRequestLog(logData) {
    try {
        await RequestLogModel.create(logData);
    } catch (error) {
        console.error("Request logging failed:", error.message);
    }
}
module.exports= {saveRequestLog}