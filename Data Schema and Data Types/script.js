use shop;

db.products.insertOne({name: "A book", price: 12.99})
db.products.insertOne({name: "Something", seller: {"name": "Gaurav", price: 12.99}})

db.dropDatabase()

use company;

db.company.insertOne({name: "Hehe has dele", isStartup: true, employees: 33, funding:987654321123455445, details: {cto: "Gaurav Saini"}, tags: ["hehe", "has", "dele"], fundingDate: new Date(), insertedAt: new Timestamp()})
db.company.insertOne({name: "Hehe has dele", isStartup: true, employees: 33, funding:987654321123455445, details: {cto: "Gaurav Saini"}, tags: ["hehe", "has", "dele"], fundingDate: new Date(), insertedAt: new Timestamp()})

db.company.drop()

db.number.insertOne({a : 1})
db.stats()
db.number.drop()
db.number.insertOne({a : NumberInt(1)})
db.stats()
db.number.drop()

db.dropDatabase()

// One-to-One Relation
use hospital
// Reference method
db.patients.insertOne({name: "Gaurav", age:NumberInt(22), diseaseSummary: "test_sum"})
db.diseaseSummaries.insertOne({ _id: "test_sum", diseases: ["cold", "sed"]})

var disId = db.patients.findOne({name: "Gaurav"}).diseaseSummary

db.diseaseSummaries.findOne({_id: disId})

// Embedded docs
db.patients.insertOne({name: "Gaurav", age:NumberInt(22), diseaseSummary: {
  diseases: ["cold", "sed"]
}})

db.patients.findOne({
  "diseaseSummary.diseases":{
    $in: ["cold"]
  }
})

db.dropDatabase()
// One-to-Many Relation
use support

// Reference method
db.questionThreads.insertOne({
  creator: "Gaurav", question: "Why sed?", answers:["q1a1", "q1a2"]
})

db.answers.insertMany([{_id: "q1a1", value:"Hehe"}, {_id: "q1a2", value:"Omg ded"}])
db.answers.find().pretty()

// Embedded docs
db.questionThreads.insertOne({
  creator: "Gaurav", question: "Why sed?", answers:["Hehe","Omg ded"]
})

db.questionThreads.findOne({
  answers: {
    $in: ["Hehe"]
  }
})
db.dropDatabase()

use shop
// Reference method
db.products.insertOne({_id:"p1", title: "TEST", price: 12.99})
db.customers.insertOne({ _id:"gaur", name: "GAURAV"})
db.orders.insertOne({ productId: "p1", customer: "gaur"})

// Embedded docs with references
db.customers.insertOne({"_id": "par", name: "PARI", orders: [{productId: "p1", quantity: 2}]})

// Pure embedded docs
db.customers.insertOne({"_id": "jan", name: "JANE", orders: [{products: {title: "Hehe", price: 12.11, quantity: 20}}]})

db.customers.find().pretty()

// Aggregate: Lookup
db.books.aggregate([
  {
    $lookup: {
      // Which collection to pull from
      from: "authors",
      // In this collection, what is the local field we are referring to
      localField: "authors",
      // Which field of the foreign collection does the local field refer to?
      foreignField: "_id",
      // Under which key should this data be projected?
      as: "creators"
    }
  }
])

db.dropDatabase()

// USER BLOG
use blog
db.user.insertOne({name: "Gaurav", age: 22, posts: []})
db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "content", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required as a part of validation"
        },
        content: {
          bsonType: "string",
          description: "must be a string containing the post content"
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["te"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              author: {
                bsonType: "objectId",
                description: "must be an object Id and is required"
              }
            }
          }
        }
      }
    }
  },
  validationAction: "warn"
})

// Administrative command to do something with an existing mongo collection
// Here the command being used is collMof = collection modifier
db.runCommand({
  collMod: "posts", validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "content", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required as a part of validation"
        },
        content: {
          bsonType: "string",
          description: "must be a string containing the post content"
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["te"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              author: {
                bsonType: "objectId",
                description: "must be an object Id and is required"
              }
            }
          }
        }
      }
    }
  },
  validationAction: "warn" // default is error
})

db.posts.insertOne({title: "TEST", content: "TEST", comments: []})

db.dropDatabase()