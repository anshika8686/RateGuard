const {getAnalyticsOverview}=require("../services/analytics.service")
const {getRecentAnalytics}=require("../services/analytics.service")
async function getAnalyticsOverviewController(req,res){
    try{
       const result=await getAnalyticsOverview();
       return res.status(200).json({
        success:true,
        data:result
       });
    }
       catch(error){
       console.error("Analytics overview error:", error.message);
       return res.status(500).json({
            success: false,
            message: "Failed to fetch analytics overview"
        });
       }
}

async function getRecentAnalyticsController(req,res){
    try{
        const result=await getRecentAnalytics()
        return res.status(200).json({
            success: true,
            result 
        })
    }
    catch(error){
        console.error("Recent Analytics overview error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch analytics overview"
        })
    }
}
module.exports={
    getAnalyticsOverviewController,
    getRecentAnalyticsController
}