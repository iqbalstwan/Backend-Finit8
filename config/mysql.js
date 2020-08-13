const mysql = require("mysql")
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password :"",
    database : "online-shop"
})

connection.connect(error => {
    if (error){
        throw error
    }
    console.log("Now connected")
})

module.exports = connection