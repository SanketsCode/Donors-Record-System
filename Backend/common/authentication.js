const jwt =  require("jsonwebtoken");
const Model = require("../model")

module.exports.getToken = (data) => 
    jwt.sign(data,process.env.SECRETE_KEY,{expiresIn: "180d"})


module.exports.verifyToken = (token) => jwt.verify(token,process.env.SECRETE_KEY);

module.exports.verifyAdmin = async(req,res,next) => {
    try {
        const token = String(req.headers.authorization || "")
        .replace(/bearer|jwt/i,"")
        .replace(/^\s+|\s+$/g,"")

        const decoded = this.verifyToken(token);

        const doc = await Model.Admin.findOne({
            _id : decoded._id,
            accessToken :token
        }).lean();

        if(!doc) throw new Error("Invalid Token");

        req.user = doc;
        next();

    } catch (error) {
        console.error(error);
    const message =
      String(error.name).toLowerCase() === "error"
        ? error.message
        : "UNAUTHORIZED_ACCESS";
    return res.status(401).json({ message });
    }
}