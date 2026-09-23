async function getDataController(req,res){
    res.status(200).json({
        message: "This is backend protected data",
        timestamp: new  Date()
    })
}

module.exports={
    getDataController}