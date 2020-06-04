const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.listen(3000)
server.use(express.static('public'))

server.get('/', (request, response) => {
    response.render(__dirname + "/views/index.html", { title: "Seu marketplace de coleta de resíduos" })
})
server.get('/create-point', (request, response) => {
    response.render(__dirname + "/views/create-point.html")
})
server.get('/search', (request, response) => {
    response.render(__dirname + "/views/search-results.html")
})