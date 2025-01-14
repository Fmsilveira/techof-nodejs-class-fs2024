const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

async function find() {
  try {
    await client.connect();

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.find({
      _id: new ObjectId('677d88a187ecb3ed2dabef6a')
    }).toArray();
    console.log(result)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
find().catch(console.error)