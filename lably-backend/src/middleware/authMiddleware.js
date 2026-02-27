const jwt = require("jsonwebtoken")

function authMiddleware (req, res ,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message: 'unauthorized'})
    }
    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decode
        next()
    }catch(error) {
        return res.status(401).json({message: 'Invalid token'})
    }


}

function adminMiddleware(req,res,next) {
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Access denied'})
    }
    next()
}

module.exports = {authMiddleware, adminMiddleware}