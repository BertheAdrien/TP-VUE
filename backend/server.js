const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json()) 

// Route GET /users
app.get('/users', (req, res) => {
  const filePath = path.join(__dirname, 'users.json')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Impossible de lire le fichier users.json' })
    }
    res.json(JSON.parse(data))
  })
})

// Route GET /users/:id
app.get('/users/:id', (req, res) => {
  const filePath = path.join(__dirname, 'users.json')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Impossible de lire le fichier users.json' })
    const users = JSON.parse(data)
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' })
    res.json(user)
  })
})

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`API Users démarrée sur http://localhost:${PORT}`)
})