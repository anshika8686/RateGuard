const path=require("path")
require("dotenv").config({
    path: path.join(__dirname, "..",".env")
});


const connectToDb=require("../src/config/mongoose")
const ApiKeyModel = require("../src/models/apiKey.model");

async function updateLimit() {
    try {
        await connectToDb();

        const result = await ApiKeyModel.updateOne(
            { name: "test_name3" },
            { $set: { rateLimit: 2 } }
        );

        
        console.log("Result is")
        console.log(result);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

updateLimit();