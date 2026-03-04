/**
 * User.js
 * 
 * Handles all database queries for the users table.
 * Covers Authentication Only.
 */

const pool = require('../config/database')
const { randomUUID } = require('crypto')

class User {
    // Find a user by email used during login to get password for bcrypt comparison
    static async findByEmail(email){

        const query = `SELECT id, email, password, role, is_active FROM users WHERE email = $1`

        const result = await pool.query(query, [email])

        return result.rows[0]
    }

// Create a new user, account is inactive by default until user activate it
    static async createUser(userData) {
        const query = `INSERT INTO users (id, email, password, role, is_active) VALUES ($1, $2, $3, $4, $5)`
        const id = randomUUID()

        await pool.query(query ,[
            id,
            userData.email,
            userData.password,
            userData.role,
            userData.is_active
        ] )

        return {id, email: userData.email , role: userData.role , is_active : userData.is_active}
    }

    // Set an activation token after admin approves, token expires in 48 hours
    static async setActivationToken(token ,expiry, userId) {
   
        const query = `UPDATE users SET activation_token = $1, activation_token_expires = $2 WHERE id = $3`
        await pool.query(query, [token, expiry, userId])

    }

    // Validate token before activating
    static async findActivationToken(token) {
        const query = `SELECT id, activation_token_expires  FROM users WHERE activation_token =$1`
        const result = await pool.query(query , [token])

        return result.rows[0]
    }

    // Activate account, sets password, marks active, clears token so it cant be reused
    static async activateUser(userId, hashedPassword) {
    const query = `UPDATE users SET password = $1, is_active = true, activation_token = NULL, activation_token_expires = NULL WHERE id = $2`
    await pool.query(query, [hashedPassword, userId])
    }   
    // Find user by ID 
    static async findById(userId){
        const query = `SELECT id, email, role, is_active FROM users WHERE id = $1`
        const result = await pool.query(query , [userId])
        return result.rows[0]
    }
}

module.exports = User