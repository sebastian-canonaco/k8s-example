const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT

var mysql      = require('mysql');
var numOfReq   = 0
var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
});


console.log('host:', process.env.MYSQL_HOST, 'port:', process.env.MYSQL_PORT, 'user:', process.env.MYSQL_USER, 'password:', process.env.MYSQL_PASSWORD, 'database:', process.env.MYSQL_DATABASE) 

app.disable('etag');

app.get('/persons', (req, res) => {
    numOfReq += 1
    console.log('Request: ', numOfReq, ' GET /persons')
    connection.query('SELECT id,name,birthDate,dni FROM persons', function (error, results, fields) {
        if (error) throw error
        res.status(200).json(results)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})