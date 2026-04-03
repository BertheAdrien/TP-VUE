const request = require('supertest')
const app = require('../server')

describe('API Users Tests', () => {
  describe('GET /users', () => {
    it('devrait retourner la liste des utilisateurs', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200)
      
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('name')
      expect(response.body[0]).toHaveProperty('email')
      expect(response.body[0]).toHaveProperty('role')
      expect(response.body[0]).toHaveProperty('status')
    })

    it('devrait retourner des utilisateurs avec des propriétés valides', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200)
      
      const user = response.body[0]
      expect(typeof user.id).toBe('number')
      expect(typeof user.name).toBe('string')
      expect(typeof user.email).toBe('string')
      expect(['Student', 'Teacher', 'Admin']).toContain(user.role)
      expect(['Active', 'Inactive', 'Pending']).toContain(user.status)
    })
  })

  describe('GET /users/:id', () => {
    it('devrait retourner un utilisateur spécifique', async () => {
      const response = await request(app)
        .get('/users/1')
        .expect(200)
      
      expect(response.body).toHaveProperty('id', 1)
      expect(response.body).toHaveProperty('name')
      expect(response.body).toHaveProperty('email')
    })

    it('devrait retourner 404 pour un utilisateur inexistant', async () => {
      const response = await request(app)
        .get('/users/999')
        .expect(404)
      
      expect(response.body).toHaveProperty('error')
    })

    it('devrait retourner 400 pour un ID invalide', async () => {
      const response = await request(app)
        .get('/users/invalid')
        .expect(400)
    })
  })

  describe('CORS Headers', () => {
    it('devrait inclure les headers CORS', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200)
      
      expect(response.headers['access-control-allow-origin']).toBeDefined()
    })
  })
})
