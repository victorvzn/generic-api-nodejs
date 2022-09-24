const http = require('http')

const fruits = [
  { id: 1, name: "apple"},
  { id: 2, name: "orange"},
  { id: 3, name: "banana"},
]

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(fruits))
})

const PORT = 3001

app.listen(PORT)

console.log(`Server running on port ${PORT}`)
