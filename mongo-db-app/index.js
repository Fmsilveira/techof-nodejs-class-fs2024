
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://my-new-user:GAWTJzwatdDzC3mZ@techof.0l1vepo.mongodb.net/?retryWrites=true&w=majority&appName=TechOf";

const DATABASE_NAME = "tech-of-mongodb-class-04-2024";
const COLLECTION_NAME = "people";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(DATABASE_NAME).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);

async function createDocument() {
  try {
    await client.connect();

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const peopleDocument = {
      name: {
        first: 'Henry III',
        last: 'of England'
      },
      birth: new Date(1216, 9, 28),
      death: new Date(1272, 10, 16),
      regents: [
        'William Marshal',
        'Hubert de Burgh'
      ]
    }
    await collection.insertOne(peopleDocument)

    const result = await collection.find().toArray();
    console.log(result);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// createDocument().catch(console.dir);
