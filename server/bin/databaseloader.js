var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("BOOKCLUB");
  var myobj = [
    { name: 'Ironhack Readers', description: "Nos gustan los libros técnicos", city: "Madrid" , creator: "German", books: "Eloquent Javascript"},
    { name: 'El club de Alex Cabo', description: 'Leemos libros de cocina', city: "Valencia", creator: "Alex", books: "El jugador de ping pong"}
  ];
  dbo.collection("bookclubs").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});