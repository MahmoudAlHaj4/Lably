const superTest = require('supertest')
const app = require('../app')
const pool = require('../src/config/database')
const request = superTest(app)


describe('EmployerProfile ',()=>{
    let token 

    beforeAll( async () =>{
         await request.post('/api/auth/register')
        .send({
            email: "employertest@test.com",
            password : "employer123"
        })

        const res = await request.post('/api/auth/login')
        .send({
            email: "employertest@test.com",
            password: "employer123"
        })
        token = res.body.data.token
    }, 15000)

    afterAll(async () => {
        await pool.query('DELETE FROM employer_profiles WHERE user_id = (SELECT id FROM users WHERE email = $1)', ['employertest@test.com'])
        await pool.query('DELETE FROM users WHERE email = $1', ['employertest@test.com'])
    })

    it("Should Create Employer profile", async () => {
        const res = await request.post('/api/employer/profile')
            .set('Authorization', `Bearer ${token}`)
            .field('company_name', 'Test Company')
        expect(res.status).toBe(201)
    })

    it("Should Get Employer Profile" , async ()=> {
        const res = await request.get('/api/employer/profile')
        .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })

    it("Should Update Employer Profile", async () => {
        const res = await request.put('/api/employer/profile')
            .set('Authorization', `Bearer ${token}`)
            .field('company_name', 'test update')
        expect(res.status).toBe(200)
    })
})