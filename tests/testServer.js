const express = require("express");
const app = express();
const cors = require("cors");
const { resolve } = require("path");
const https = require('https');
const fs = require('fs');



// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/beltExamPets', {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true});

app.use(
  cors(),
  express.json(),
  express.urlencoded({extended:true}),
);
app.use('/js', express.static('./'))
app.use('/data', express.static('../server/public/data'))
app.get('/gputest', (req, res) => {
	res.sendFile(resolve('./gpujsTest.html'), err => console.log(err))
})

const key = fs.readFileSync('../cert/CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('../cert/CA/localhost/localhost.crt');
const server = https.createServer({ key, cert }, app);

const port = 8000;
server.listen(port, () =>  console.log(`Now listening on port ${port}`));
