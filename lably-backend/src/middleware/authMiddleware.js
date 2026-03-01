/**
 * authMiddleware.js
 * 
 * Protects routes by verifying JWT tokens and checking user roles.
 * Must be applied before any protected route.
 * 
 * Functions:
 * authMiddleware: verifies the JWT token and attaches the decoded user to the request.
 * adminMiddleware: checks if the authenticated user has the admin role.
 * 
 * 
 * authMiddleware Flow:
 * 1. Extract the Authorization header from the request.
 * 2. Split off the Bearer prefix to get the token.
 * 3. If no token found → 401 Unauthorized.
 * 4. Decode and verify the token using JWT_SECRET.
 * 5. If token invalid or expired → 401 Invalid token.
 * 6. If valid, attach decoded user (id and role) to req.user and call next.
 * 
 * 
 * adminMiddleware Flow:
 * 1. Check req.user.role.
 * 2. If role is not admin → 403 Access denied.
 * 3. If role is admin → call next.
 */

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