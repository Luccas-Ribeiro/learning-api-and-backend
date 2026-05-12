const http = require('http')


const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/aluno":
      res.writeHead(200, { 'Content-Type': 'text/json' })
      res.write(JSON.stringify({ "msg": "Aluno criado", "path": req.url }))
      res.end()
      break
    default:
      res.writeHead(404, { 'Content-Type': 'text/json' })
      res.write(JSON.stringify({ "msg": "Path não encontrado", "path": req.url }))
      res.end()
  }
})

server.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080')
})