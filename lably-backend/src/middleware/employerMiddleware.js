/**
 * employerMiddleware.js
 * 
 * Protects employer routes. Runs after authMiddleware.
 * Checks role and account activation before allowing access.
 * 
 * employerMiddleware Flow:
 * 1. Check req.user.role if not employer → 403 Forbidden.
 * 2. Find user by ID using User.findById checks is_active status.
 * 3. If account not activated → 403 Forbidden.
 * 4. Call next.
 */

const User = require("../models/User")


async function employerMiddleware(req, res, next) {
    try{
        const role = req.user.role
        const userId = req.user.id

        if(role !== 'employer'){
            return res.status(403).json({message: "forbidden You are not Employer"})
        }
        const isActive = await User.findById(userId)

        if(isActive.is_active === false) {
            return res.status(403).json({message: "forbidden You must activate your account first"})
        }
        next()
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {employerMiddleware}