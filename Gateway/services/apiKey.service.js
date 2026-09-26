const crypto=require('crypto')
const generateKey=()=>{
     const randomPart = crypto.randomBytes(32).toString("base64url"); //gives a 256 bit secret key
     console.log(`fg_${randomPart}`)
     return `fg_${randomPart}`
}

const hashApiKey=(apikey)=>{
    return crypto.createHash("sha256").update(apikey).digest("hex")
}

module.exports={
    generateKey,
    hashApiKey
}