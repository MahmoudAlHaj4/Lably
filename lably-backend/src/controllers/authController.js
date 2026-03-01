/**
 * authController.js
 * 
 * Handles all authentication logic: login, account activation, and employer registration.
 * 
 * Functions:
 * login(req, res): Validates credentials and returns a JWT token.
 * activateAccount(req, res): Sets password and activates a job seeker account.
 * employerRegister(req, res): Registers a new employer account.
 * 
 * Login Flow:
 * 1. Validate email and password exist in request body.
 * 2. Find user by email using { User.findByEmail (function in User Model that queries users table and returns the matching user) }.
 * 3. If user not found → 401 Invalid credentials.
 * 4. If account not activated → 403 Account not activated.
 * 5. Compare password with bcrypt.
 * 6. If no match → 401 Invalid credentials.
 * 7. Sign JWT with user id and role, expires in 7 days.
 * 8. Return token and role to client.
 * 
 * Activate Account Flow:
 * 1. Validate password exists in request body.
 * 2. Find activation token using { User.findActivationToken (function in User Model that queries users table and and returns the user ID and token expiry)}.
 * 3. If token not found → 400 Invalid token.
 * 4. If token expired → 400 Token expired.
 * 5. Hash the new password.
 * 6. Activate user account by using {User.activateUser (function in User Model that updates the users table, saves hashed password, sets is_active to true, and clears the token)}.
 * 7. Return success.
 * 
 * Employer Register Flow:
 * 1. Validate email exists in request body.
 * 2. Check email is not already taken by using {User.findByEmail}.
 * 3. Validate password exists in request body.
 * 4. Hash password.
 * 5. Create user using {User.create (function in User Model that inserts a new row in the users table with role set to employer and is_active set to true, returns the created user)}.
 * 6. Return success.
 */

const User = require('../models/User')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')

async function login(req, res) {
    try{
        const {email, password} = req.body

        if(!email) {
            return res.status(400).json({message: 'Email is required'})
        }
        if(!password) {
            return res.status(400).json({message: 'Password is required'})
        } 

        const user = await User.findByEmail(email)
        
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        if(!user.is_active) {
            return res.status(403).json({ message: 'Account not activated' })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({
            id: user.id , role: user.role
        },  process.env.JWT_SECRET,
        { expiresIn: '7d' }
        )

        res.status(200).json({
            message: 'Login successful',
            token: token,
            role: user.role
        })

    }catch(error) {
        res.status(500).json({error: error.message})
    }

}

async function activateAccount(req, res) {
    try{
        const {password , token} = req.body

        if(!password) {
            return res.status(400).json({message: 'Password is required'})
        } 
        const checkToken = await User.findActivationToken(token)
        if(!checkToken) {
            return res.status(400).json({ message: 'Invalid token' })
        }

        if(new Date() > new Date(checkToken.activation_token_expires)) {
            return res.status(400).json({ message: 'Token expired' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

         await User.activateUser(checkToken.id , hashedPassword)
        return res.status(200).json({ message: 'Account activated successfully' })

    }catch(err) {
        return res.status(500).json({message: err.message})
    }

}


async function employerRegister(req , res) {
    try{
        const {email , password} = req.body

        if(!email){
            return res.status(400).json({message : "Email is required"})
        }
        const checkEmail = await User.findByEmail(email)
        if(checkEmail){
            return res.status(400).json({message: "Email already Used"})
        }

        if(!password){
            return res.status(400).json({message: "Password is required"})
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        const user = await User.createUser({
            email: email,
            password: hashedPassword,
            role: 'employer',
            is_active: true
            
        })

        if(!user) {
            return res.status(400).json({message: "Failed to register"})
        }

        return res.status(201).json({message: 'success'})

    }catch(err) {
        return res.status(500).json({message: err.message})
    }
    }

module.exports = {login , activateAccount , employerRegister}