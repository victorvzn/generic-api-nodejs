const express = require('express')
const cors = require('cors')
const logger = require('./middlewares/logger')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  { id: 1, content: 'Note #1', date: '2022-09-24T15:04:22.098Z', important: true },
  { id: 2, content: 'Note #2', date: '2022-09-24T15:04:22.098Z', important: true },
  { id: 3, content: 'Note #3', date: '2022-09-24T15:04:22.098Z', important: true }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello API</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({ error: 'note.content is missing' })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const important = typeof note.important !== 'undefined' ? note.important : false

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important,
    date: new Date().toISOString()
  }

  // notes = [...notes, newNote]
  notes = notes.concat(newNote)

  res.json(notes)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
