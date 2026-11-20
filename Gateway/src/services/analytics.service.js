const RequestLogModel = require("../models/requestLog.model");

async function getAnalyticsOverview() {
    const result = await RequestLogModel.aggregate([
        {
            $group: {
                _id: null,

                totalRequests: {
                    $sum: 1
                },

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
                unauthorizedRequests:{
                    $sum: {
                        $cond: [
                            {
                                $eq:["$status_code", 401]},
                            1,
                            0
                        ]
                    }   
                },
                rateLimitedRequests:{
                     $sum: {
                        $cond: [
                            {
                                $eq:["$status_code", 429]},
                            1,
                            0
                        ]
                    }  

                },
                failedRequests:{
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    { $gte: ["$status_code", 500] },
                                    { $lt: ["$status_code", 600] }
                                ]
                            },
                            1,
                            0
                        ]

                    }  
                }
                
            }
        }
    ]);
    return result[0] || {
    totalRequests: 0,
    successfulRequests: 0,
    unauthorizedRequests: 0,
    rateLimitedRequests: 0,
    failedRequests: 0
};
}

async function getRecentAnalytics(){
    const requests=await RequestLogModel.find() //return all the documents
    .sort({createdAt:-1}) //sort from latest to oldest
    .limit(10)

    return requests
}
module.exports={
    getAnalyticsOverview,
    getRecentAnalytics}