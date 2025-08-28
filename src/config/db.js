
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host:     restrict.env.DB_HOST,
  user:     restrict.env.DB_USER,
  password: restrict.env.DB_PASSWORD,
  database: restrict.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
  connection.release();
});

module.exports = pool;
