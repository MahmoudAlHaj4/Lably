const superTest = require("supertest")
const app = require('../app')
const pool = require('../src/config/database')

const request = superTest(app)

describe('PendingApplication',()=>{
    afterAll(async()=>{
        await pool.query(`DELETE FROM pending_applications WHERE email =?`, ['test@gmail.com'])
        await pool.end()
    })

    it('Should Successfully submit', async()=>{
        const res = await request.post('/api/pendingApplication/submit').attach('resume', './__tests__/test-resume.pdf').field({email: "test@gmail.com"}).field({full_name: "Mahmoud"}).field({phone: "0236545789"}).field({address: "any Address"})
        console.log(res.body)
        expect(res.status).toBe(201)
        expect(res.body.message).toBe("Application submitted")
    })

    it('Should fail without resume', async () => {
    const res = await request.post('/api/pendingApplication/submit')
        .field('email', 'test2@gmail.com')
        .field('full_name', 'Mahmoud')

    expect(res.status).toBe(400)
})
})