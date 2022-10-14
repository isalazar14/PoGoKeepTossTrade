// const {connection, connect, disconnect, pool, getConnection, release} = require("../util/db");
const db = require('../util/db')
const fs = require('fs');
const { resolve } = require('path');

// const con = mysql2.createConnection()


module.exports = {
  getFile: async (req, res) => {
    try{
     const data =  await fs.readFileSync(resolve('../public/data/pokemon.csv'))
     console.log(data);
     res.send(data)
    }
    catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  // getData: (req, res) => {
  //   const stream = new 
  // },
  test: (req, res) => {
    res.send("api works");
  },
  csvUpload : async (req, res) => {
    console.log('csv upload route');
    console.log('req.body', req.body);
    res.status(201).send("upload received");
  },
  getFamilyForkStages: async (req, res) => {
    console.log("==========================");
    console.log("in controller, calling db helper");
    const results = await db.getFamilyForkStages();
    console.log("back in controller after response from db helper")
    console.log("returned json")
    // console.log(results)
    
    console.log("==========================");
    res.json({data: results})
    // // db.getFamilyForkStages((data) => {
    // //   console.log("in controller callback after db call");
    // //   // if (err) {
    // //   //   res.status(400).json(err);
    // //   //   console.log("sent error");
    // //   // } else {
    // //     res.json(data);
    // //     console.log("sent data");
    // //   // }
    // // });
    
    // // connect(connection)
    // poolQuery(pool, () =>{
    // const sql = "select * from family_fork_stages";
    // console.log("--------------------------");
    // // console.log("thread ID", connection.threadId)
    // connection.query(sql, (err, results) => {
    //   // connection.destroy();
    //   release(pool)
    //   console.log("executing query:\n", sql);
    //   // console.log("getFamilyForkStages");
    //   if (err) {
    //     // console.log("ERROR:", err);
    //     throw err;
    //     // } else {
    //     // console.log("fields", fields);
    //     // console.log("results", res);
    //     // return res
    //   }
    //   res.json(results);
    //   // disconnect(connection)
    // });
  },
};
