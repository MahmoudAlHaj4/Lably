const superTest = require("supertest")
const app = require('../app')
const pool = require('../src/config/database')
const jwt = require('jsonwebtoken')
const supabase = require('../src/config/supabase')

const request = superTest(app)

describe('PendingApplication',()=>{
    let applicationId
      adminToken = jwt.sign(
        { id: 'admin-test-id', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
        )

    beforeAll(async()=>{
        const result = await pool.query(`SELECT resume_path FROM pending_applications WHERE email = $1`, ['test@gmail.com'])
    
        if(result.rows[0]){
            await supabase.storage.from('resumes').remove([result.rows[0].resume_path])
        }
        await pool.query(`DELETE FROM pending_applications WHERE email = $1`, ['test@gmail.com'])
    })

    afterAll(async()=>{
        await pool.query(`DELETE FROM pending_applications WHERE email =$1`, ['test@gmail.com'])
       
    })

    it('Should Successfully submit', async()=>{
        const res = await request.post('/api/pending-applications').attach('resume', './__tests__/test-resume.pdf').field({email: "test@gmail.com"}).field({full_name: "Mahmoud"}).field({phone: "0236545789"}).field({address: "any Address"})
        console.log(res.body)
        expect(res.status).toBe(201)
        expect(res.body.message).toBe("Application submitted")
        applicationId = res.body.data.id
    })

    it('Should fail without resume', async () => {
    const res = await request.post('/api/pending-applications')
        .field('email', 'test2@gmail.com')
        .field('full_name', 'Mahmoud')

    expect(res.status).toBe(400)
})
    it('Should get all pending applications', async () => {
        const res = await request.get('/api/admin/pending-applications')
        .set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(200)
    })

    it('Should get pending application', async () => {
        const res = await request.get(`/api/admin/pending-application/${applicationId}`)
        .set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(200)
    })

    it('Should reject pending application', async () => {
        const res = await request.put(`/api/admin/reject/${applicationId}`)
        .set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(200)
    })
})