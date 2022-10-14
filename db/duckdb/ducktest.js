var duckdb = require('duckdb');
var db = new duckdb.Database('../sqlite/pokemon_go.db'); // or a file name for a persistent DB
// var con = db.connect();
db.all('select * From duckdb_extensions();', function(err, res) {
  if (err) {
    throw err;
  }
  console.log(res)
});