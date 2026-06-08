import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function authMiddleware (req, res, next) {
    try{
        const auth = req.headers.authorization;

        //console.log("AUTH HEADER:", auth);
        //console.log("SECRET:", SECRET);

        if(!auth?.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Token Required."
            });
        }

        const token = auth.split(" ")[1];

        const decoded = jwt.verify(token, SECRET);
        
        req.user = decoded;
        
        next();
    } catch(error) {
        //console.log("JWT ERROR:", error);

        return res.status(403).json({
            success: false, 
            message: "Invalid Token."
        })
    }
}