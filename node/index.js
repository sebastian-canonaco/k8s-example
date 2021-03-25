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

    const create = 'create table persons' +
        ' (' +
        ' id int default 0 not null,' +
        ' name varchar(100) null,' +
        ' birthDate date null,' +
        ' dni int null,' +
        ' constraint persons_id_uindex ' +
        ' unique (id) ' +
        ');';

    console.log('Create table: ' + create)
    connection.query(create, function (error, results, fields) {
        if (error) {
            console.log('creation error: ' + error)
            //throw error
        } else {
            console.log('creation results: ' + JSON.stringify(results))
        }

    });

    const insert = 'insert into db.persons (id, name, birthDate, dni) values (1, \'Jhon Doe\', \'2021-03-22\', 203332221)';
    console.log('Insert person: ' + insert)
    connection.query(insert, function (error, results, fields) {
        if (error) {
            console.log('insert error: ' + error)
            //throw error
        } else {
            console.log('insert results: ' + JSON.stringify(results))
        }
    });
})