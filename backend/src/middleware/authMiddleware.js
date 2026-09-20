import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // console.log("authMiddleware",req.headers.authorization);
    
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.json({message:"Token not found", success:false})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.json({message:"Token not found", success:false})
        }
        req.user = user;
        next();
    })
}
