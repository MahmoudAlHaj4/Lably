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

module.exports = {login}