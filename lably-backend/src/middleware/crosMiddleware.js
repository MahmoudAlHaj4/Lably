/**
 * corsMiddleware.js
 * 
 * Configures CORS to allow requests from the frontend dev server.
 * Handles preflight OPTIONS requests before the actual request is sent.
 * 
 * - Allows origin: http://127.0.0.1:5500 (Live Server default port).
 * - Allows headers: Content-Type and Authorization.
 * - Allows methods: GET, POST, PUT, DELETE.
 * - If preflight OPTIONS request → respond 200 immediately without hitting routes.
 */

const corsMiddleware = (req, res, next) => {

   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    if (req.method === 'OPTIONS') {
    res.sendStatus(200)
    return  
    }

    next()
}

module.exports = corsMiddleware