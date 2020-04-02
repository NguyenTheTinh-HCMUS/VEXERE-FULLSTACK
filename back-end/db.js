const mysql=require('mysql')
module.exports= mysql.createConnection(
    {
        "host": "localhost",
        "user": "root",
        "password": "u14071999",
        "database": "vexere"
      }
)