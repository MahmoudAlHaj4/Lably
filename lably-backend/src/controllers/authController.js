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