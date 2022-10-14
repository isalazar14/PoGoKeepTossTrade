const mysql = require("mysql2/promise");
// import {Connection} from 'mysql2'
const dbOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: "pokemon_go",
  connectionLimit: 5,
};
// mysql.format(`with test as (
//   select col1, col2, 
// )`)
const pool = mysql.createPool(dbOptions);

const getFamilyForkStages = async () => {
  console.log("--------------------------");
  console.log("connecting to db...");
  // const con = await pool.getConnection();
  // console.log("connected, threadId:", con.threadId);
  const sql = "select * from family_fork_stages";
  const [results, fields] = await pool.query(sql);
  return results;
  // console.log("executing query");
  // console.log(`"${sql}"`);
  // try {
  //   const [rows, fields] = await con.query(sql);
  //   console.log("received response");
  //   console.log("rows", rows);
  //   // console.log("fields", fields)
  //   con.release();
  //   console.log("db connection released");
  //   console.log("--------------------------");
  //   return rows;
  // } catch (err) {
  //   console.error(err);
  //   process.exit(1);
  // }
};

// connect();

module.exports = {
  // connection,
  // connect,
  // disconnect,
  pool,
  // getConnection,
  // poolQuery,
  // release,
  getFamilyForkStages,
};
