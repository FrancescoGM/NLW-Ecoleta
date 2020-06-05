const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const db = require('./database/db')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.listen(3000)
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

server.get('/', (request, response) => {
    response.render(__dirname + "/views/index.html", { title: "Seu marketplace de coleta de resíduos" })
})
server.get('/create-point', (request, response) => {
    response.render(__dirname + "/views/create-point.html")
})
server.post('/save-point', (request, response) => {
    const values = [
        request.body.image,
        request.body.name,
        request.body.address,
        request.body.address2,
        request.body.state,
        request.body.city,
        request.body.items
    ]
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);`

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        return response.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)
})

server.get('/search', (request, response) => {
    const search = request.query.search
    if (search == "") {
        return response.render("search-results.html", { placeLength: 0 })
    } else {
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
            if (err) {
                return console.log(err)
            } else {
                return response.render("search-results.html", { places: rows, placeLength: rows.length })
            }
        })
    }
})