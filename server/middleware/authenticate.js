const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");
const keysecret = process.env.KEYSECRET


const authenticate = async (req,res,next)=>{

    try{
        const token = req.headers.authorization;
        // console.log(token);
        const verifytoken = jwt.verify(token, keysecret);
        // console.log(verifytoken);
        const rootUser = await user.findOne({_id: verifytoken._id});
        // console.log(rootUser);
        if(!rootUser){ throw new Error("user not found")}

        req.token = token
        req.rootUser= rootUser
        req.userId = rootUser._id

        next();
    }catch(err){
        res.status(401).json({status:401, message: "Unauthorized no token provided"})
    }
}

module.exports = authenticate;