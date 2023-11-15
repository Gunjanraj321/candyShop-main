const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"data"
})

module.exports = db;