const mysql = require('mysql2')
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Divii@27',
    database: 'task_db'
})
mysqlConnection.connect((err)=>{
    err?console.log(err):console.log('Db connected')
})

module.exports = mysqlConnection