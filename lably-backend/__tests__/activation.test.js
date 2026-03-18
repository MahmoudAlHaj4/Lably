const superTest = require('supertest')
const app = require('../app')
const pool = require('../src/config/database')
const jwt = require('jsonwebtoken')

const request = superTest(app)

jest.mock('../src/services/emailService', () => ({
    sendActivationEmail: jest.fn().mockResolvedValue(undefined)
}))

describe('Activation', ()=>{
  let pendingApplicationId
  let activationToken
  let adminToken

  beforeAll(async () => {
    adminToken = jwt.sign(
    { id: 'admin-test-id', role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    )
    await pool.query('DELETE FROM users WHERE email = $1', ['activation@test.com'])
    await pool.query('DELETE FROM pending_applications WHERE email = $1', ['activation@test.com'])
  })

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE email = $1', ['activation@test.com'])
    await pool.query('DELETE FROM pending_applications WHERE email = $1', ['activation@test.com'])
  })

  it('Should submit pending application', async () => {
    const res = await request.post('/api/pending-applications')
    .attach('resume', './__tests__/test-resume.pdf')
    .field('email', 'activation@test.com')
    .field('full_name', 'Flow Test')
    .field('phone', '0236545789')
    expect(res.status).toBe(201)
    expect(res.body.data.id).toBeDefined()
    pendingApplicationId = res.body.data.id
  })

 it('Should approve and get Activation Token', async () => {
    const res = await request
    .put('/api/admin/approve/' + pendingApplicationId)
    .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)

    const result = await pool.query(
        'SELECT activation_token FROM users WHERE email = $1',
        ['activation@test.com']
    )
    activationToken = result.rows[0].activation_token
    expect(activationToken).toBeDefined()
})

  it('Should fail activation with wrong token', async () => {
    const res = await request.put('/api/auth/activate')
    .send({password: "NewPassword123@", token: "invalid-token"})

    expect(res.status).toBe(400)
    expect(res.body.message).toBe('This activation link is invalid. Please contact support.')
  })

  it('Should activate account successfully', async () => {
    const res = await request.put('/api/auth/activate')
    .send({password: "NewPassword123@", token: activationToken})

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Your account has been activated. You can now log in.')
  })

  it('Should login after activation', async () => {
    const res = await request.post('/api/auth/login')
    .send({email: 'activation@test.com', password: 'NewPassword123@'})

    expect(res.status).toBe(200)
    expect(res.body.data.token).toBeDefined()
    })
})