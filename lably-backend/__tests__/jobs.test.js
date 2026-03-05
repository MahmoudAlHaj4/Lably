const superTest = require('supertest')
const app = require('../app')
const pool = require('../src/config/database')
const request = superTest(app)

describe('Jobs', ()=>{
    let token
    let jobId

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
        jobId = res.body.data.id
    })

    it('Should get Employer Jobs' , async () => {
        const res = await request.get('/api/jobs/job')
        .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })

    it('Should Get a Job ', async () => {
        const res= await request.get(`/api/jobs/job/${jobId}`)
        .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })

    it("Should Update A Job", async () => {
        const res = await request.put(`/api/jobs/job/${jobId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            job_title: 'test update',
            description: "test description",
            requirements: "test requirements",
            location: 'test location',
            job_type:"on_site"
        })

        expect(res.status).toBe(200)
    })

    it('Should Delete A Job', async () => {
        const res = await request.delete(`/api/jobs/job/${jobId}`)
        .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })
})