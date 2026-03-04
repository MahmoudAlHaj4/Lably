const superTest = require("supertest")
const app = require('../app')
const pool = require('../src/config/database')

const request = superTest(app)

describe('Auth', ()=>{
    beforeAll(async ()=>{
        await request.post('/api/auth/register').send({
            email: "auth-test@gmail.com",
            password: "test123@"
        })
    })

    afterAll(async()=>{
        await pool.query('DELETE FROM users WHERE email = $1', ['test@gmail.com'])

    })
    it('Should login successfully' , async ()=>{
        const res = await request.post('/api/auth/login').send({
            email: "auth-test@gmail.com",
            password: "test123@"
        })
        expect(res.status).toBe(200)
        expect(res.body.token).toBeDefined()
    })

    it('Should Password Wrong', async()=>{
        const res = await request.post('/api/auth/login').send({
            email: "auth-test@gamil.com",
            password: "test123"
        })
        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Invalid credentials')
    })

    it('Should Email Wrong', async ()=>{
        const res = await request.post('/api/auth/login').send({
            email: "auth-tests@gail.com",
            password: "test123@"
        })

        expect(res.status).toBe(401)
        expect(res.body.message).toBe("Invalid credentials")
    })
})