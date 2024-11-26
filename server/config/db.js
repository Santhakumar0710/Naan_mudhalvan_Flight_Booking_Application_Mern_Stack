import mysql from 'mysql2';

const condb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aadharv17@#',
  database: 'flights',
});

condb.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + condb.threadId);
});

// Export the connection
export default condb;