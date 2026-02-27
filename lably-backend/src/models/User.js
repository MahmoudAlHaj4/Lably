const pool = require('../config/database')
const { randomUUID } = require('crypto')

class User {
    static async findByEmail(email){

        const query = `SELECT id, email, password, role, is_active FROM users WHERE email = ?`

        const [row] = await pool.query(query, [email])

        return row[0]
    }

    static async createUser(userData) {
        const query = `INSERT INTO users (id, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)`
        const id = randomUUID()

        const [result] = await pool.query(query ,[
            id,
            userData.email,
            userData.password,
            userData.role,
            userData.is_active
        ] )

        return {id, email: userData.email , role: userData.role , is_active : userData.is_active}
    }

    static async setActivationToken(token ,expiry, userId) {
   
        const query = `UPDATE users SET activation_token = ?, activation_token_expires = ? WHERE id = ?`
        await pool.query(query, [token, expiry, userId])

    }

    static async findActivationToken(token) {
        const query = `SELECT id, activation_token_expires  FROM users WHERE activation_token =?`
        const [row] = await pool.query(query , [token])

        return row[0]
    }

    static async activateUser(userId, hashedPassword) {
    const query = `UPDATE users SET password = ?, is_active = true, activation_token = NULL, activation_token_expires = NULL WHERE id = ?`
    await pool.query(query, [hashedPassword, userId])
    }   

    static async findById(userId){
        const query = `SELECT id, email, role, is_active FROM users WHERE id =?`
        const [row] = await pool.query(query , [userId])
        return row[0]
    }
}

module.exports = User