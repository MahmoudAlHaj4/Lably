/**
 * uploadMiddleware.js
 * 
 * Configures multer for handling resume and portfolio file uploads.
 * Runs before the controller, sets file destinations, names, and validates file types.
 * 
 * 
 * storage: tells multer where to save files and what to name them:
 * - destination: resumes go to uploads/resumes, portfolios go to uploads/portfolios.
 * - filename: resume gets named after a generated UUID (also saved to req.generatedId so the controller can use it).
 *             portfolio files get their own random UUID with original extension kept.
 * 
 * fileFilter: validates file types before saving:
 * - resume: PDF only, reject anything else.
 * - portfolio: PDF, JPG, PNG allowed, reject anything else.
 * 
 * upload: combines storage, fileFilter, and sets max file size to 5MB.
 */

const multer = require('multer')
const { randomUUID } = require('crypto')
const supabase = require('../config/supabase')

const storage = multer.memoryStorage()

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

const uploadToSupabase = async (file, bucket) => {
    const ext = file.originalname.split('.').pop()
    const filename = `${randomUUID()}.${ext}`

    const { error } = await supabase.storage
        .from(bucket)
        .upload(filename, file.buffer, { contentType: file.mimetype })

    if(error) throw new Error(`Upload failed: ${error.message}`)

    return filename
}

module.exports = { upload, uploadToSupabase }