use script; // This command creates a database implicitly

var test = [{lol: 10}, {ola: 20}]

db.hehe.insert(test) // Creates a collection and Inserts a doc in db

db.hehe.insertOne({Omg: 20})

db.hehe.insertOne({Omg: 20, _id:"hehe_has_dele"}) // Custom ID

db.hehe.insertOne({Omg: 20, _id:"hehe_has_dele"}) // The line below will cause an error

db.hehe.find()
db.hehe.updateOne({"_id": "hehe_has_dele"},{ $set: {Omg: 21}}) // $set or anything that starts with $set is a reserved word
db.hehe.find({"_id": "hehe_has_dele"})
db.hehe.update({"_id": "hehe_has_dele"},{Hol: 21}) // THIS LINE OVERRIDES THE DOC WITH JUST {_id and Hol}
db.hehe.find({"_id": "hehe_has_dele"})
db.hehe.update({"_id": "hehe_has_dele"},{ $set: {Omg: 21}}) // Adds Omg field to Doc
db.hehe.find({"_id": "hehe_has_dele"})
db.hehe.replaceOne({"_id": "hehe_has_dele"},{Omg: 22}) // Replaces the doc with passed data
// db.hehe.find({"Omg": { $gt: 5 }}) // Find all docs with Omg > 5

db.hehe.deleteMany({}) // Delete anything that matches the passed filter

db.passengers.insertMany([
  {
    "name": "Max Schwarzmueller",
    "age": 29
  },
  {
    "name": "Manu Lorenz",
    "age": 30
  },
  {
    "name": "Chris Hayton",
    "age": 35
  },
  {
    "name": "Sandeep Kumar",
    "age": 28
  },
  {
    "name": "Maria Jones",
    "age": 30
  },
  {
    "name": "Alexandra Maier",
    "age": 27
  },
  {
    "name": "Dr. Phil Evans",
    "age": 47
  },
  {
    "name": "Sandra Brugge",
    "age": 33
  },
  {
    "name": "Elisabeth Mayr",
    "age": 29
  },
  {
    "name": "Frank Cube",
    "age": 41
  },
  {
    "name": "Karandeep Alun",
    "age": 48
  },
  {
    "name": "Michaela Drayer",
    "age": 39
  },
  {
    "name": "Bernd Hoftstadt",
    "age": 22
  },
  {
    "name": "Scott Tolib",
    "age": 44
  },
  {
    "name": "Freddy Melver",
    "age": 41
  },
  {
    "name": "Alexis Bohed",
    "age": 35
  },
  {
    "name": "Melanie Palace",
    "age": 27
  },
  {
    "name": "Armin Glutch",
    "age": 35
  },
  {
    "name": "Klaus Arber",
    "age": 53
  },
  {
    "name": "Albert Twostone",
    "age": 68
  },
  {
    "name": "Gordon Black",
    "age": 38
  }
])

db.passengers.find().pretty() // FIND GIVES A CURSOR OBJECT, NOT THE DATA
it // LETS US CYCLE THROUGH THE DATA
// Deletes DB
db.passengers.find().pretty().toArray() // MAKES AN ARRAY WITH CURSOR VALUES

db.passengers.find().forEach((data) => printjson(data)) // Executes a function on every element

// db.passengers.findOne({name : "Klaus Arber"}).pretty() // ERROR: findOne doesn't return the cursor, but the actual document

db.passengers.find({}, {name: 1, _id: 0}) // Projection: Reveal name, hide 0

db.passengers.updateMany({}, {$set: {"ded": {"when": "yah", "till?": "foreva!"}}})
db.passengers.updateOne({"name" : "Albert Twostone"}, {$set: {"hobbies": ["ola", "uber"] }})
db.passengers.updateOne({"name" : "Klaus Arber"}, {$set: {"ded": {"when": "no", "till?": "foreva!"}}})

db.passengers.find().pretty()

db.passengers.findOne({"name" : "Albert Twostone"}).hobbies

db.passengers.find({"hobbies" : "ola"}).pretty() // Looks into hobbies array and matches the entries with 'ola' value in hobbies

db.passengers.find({"ded.when" : "no"}).pretty() // Looks into nested values in an embedded doc


db.dropDatabase()
