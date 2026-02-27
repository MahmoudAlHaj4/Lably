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