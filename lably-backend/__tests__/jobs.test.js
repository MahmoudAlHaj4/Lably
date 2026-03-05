const superTest = require('supertest')
const app = require('../app')
const pool = require('../src/config/database')
const request = superTest(app)

describe('Jobs', ()=>{
    let token

    beforeAll( async () => {
        await request.post('/api/auth/register')
        .send({
            email: "employer-test@gmail.com",
            password: "employer123"
        })

        const res = await request.post('/api/auth/login')
        .send({
            email: "employer-test@gmail.com",
            password: "employer123"
        })

        token = res.body.token
    })

    afterAll(async ()=>{
        await pool.query('DELETE FROM employer_profiles WHERE user_id = (SELECT id FROM users WHERE email = $1)', ['employer-test@gmail.com'])
        await pool.query('DELETE FROM users WHERE email = $1', ['employer-test@gmail.com'])
    })

    it('Should create A job', async ()=>{
        const res = await request.post('/api/jobs/job')
        .set('Authorization', `Bearer ${token}`)
        .send({
            job_title: "Job Test",
            description: "test description",
            requirements: "test requirements",
            location: 'test location',
            job_type:"on_site"

        })

        expect(res.status).toBe(201)
    })
})