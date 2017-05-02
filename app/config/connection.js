//============================
//    Dependencies
//============================

const mysql = require("mysql");

/**===================================
 * Check if Node enviroment variable is equal to producion,
 * If production is set, db is equal to JAWSDB_URL env variable.
 * Otherwise, create an object with localhost env variables for MySQL.
 =====================================*/

 const db = process.env.NODE_ENV === 'production'
              ? process.env.JAWSDB_URL
              : { host: process.env.MYSQL_HOST,
                  port: process.env.MYSQL_PORT,
                  user: process.env.MYSQL_PASSWORD,
                  database: process.env.MYSQL_DATABASE};

//===============================================================
//    Call mysql.createConnection using db options and save to connection variable for export
//===============================================================
const connection = mysql.createConnection(d b);

/**
 * Connect to mysql server, otherwise console error.
 *
 * BURGER Better implement mysql error handling
 */
connection.connect((error) => {
  if(error)
      console.log(`MySQL connection error: ${erros.stack}`);
  else
      console.log(`MySQL connection id ${connection.threadId}`);

});

/**
 * Export connection object for use in ORM
 */
 module.exports = connection;
