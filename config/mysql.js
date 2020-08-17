const mysql = require("mysql")
const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_BASE
})

connection.connect(error => {
    if (error){
        throw error
    }
    console.log("Now connected")
})

module.exports = connection