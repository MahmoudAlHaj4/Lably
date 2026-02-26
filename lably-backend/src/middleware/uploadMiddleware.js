const multer = require('multer')
const { randomUUID } = require('crypto')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.fieldname === 'resume'){
            cb(null, 'uploads/resumes')
        } else {
            cb(null, 'uploads/portfolios')
        }
    },
    filename: function(req, file, cb){
        if(file.fieldname === 'resume'){
            const id = randomUUID()
            req.generatedId = id
            cb(null, `${id}.pdf`)
        } else {
            const ext = file.originalname.split('.').pop()
            cb(null, `${randomUUID()}.${ext}`)
        }
    }
})

const fileFilter = function(req, file, cb){
    if(file.fieldname === 'resume'){
        if(file.mimetype === 'application/pdf'){
            cb(null, true)
        } else {
            cb(new Error('Resume must be PDF'), false)
        }
    } else {
        const allowed = ['application/pdf', 'image/jpeg', 'image/png']
        if(allowed.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new Error('Portfolio: only PDF, JPG, PNG allowed'), false)
        }
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 }})

module.exports = upload