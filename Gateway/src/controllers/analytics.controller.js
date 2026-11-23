const {getAnalyticsOverview, getRecentAnalytics, getweekAnalytics, getTopKeys}=require("../services/analytics.service")
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
            data:result 
        })
    }
    catch(error){
        console.error("Recent Analytics overview error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch recent analytics overview"
        })
    }
}

async function getWeekAnalyticsController(req,res){
    
    try{
        const result=await getweekAnalytics()
        return res.status(200).json({
        success:true,
        data:result
    })}
    catch(error){
        console.error("Recent Analytics overview error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch weekly analytics overview"
        })
    }
}

async function getTopKeysController(req,res){
        try{
        const result= await getTopKeys()
        return res.status(200).json({
            success:true,
            data:result
        })
    }
    catch(error){
        console.error("Recent Analytics overview error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch weekly analytics overview"
        })
    }
}

module.exports={
    getAnalyticsOverviewController,
    getRecentAnalyticsController,
    getWeekAnalyticsController,
    getTopKeysController
}