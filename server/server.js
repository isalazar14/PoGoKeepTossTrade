const express = require("express");
const app = express();
const cors = require("cors");
const mysql2 = require('mysql2');
require('dotenv').config();



// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/beltExamPets', {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true});

app.use(
  cors(),
  express.json(),
  express.urlencoded({extended:true}),
);
app.use('/data', express.static('./public/data'))

require('./routes/routes')(app)
const port = 8000;

app.listen(port, () => console.log(`Now listening on port ${port}`));
