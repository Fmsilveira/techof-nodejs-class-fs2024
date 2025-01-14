const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://my-new-user:GAWTJzwatdDzC3mZ@techof.0l1vepo.mongodb.net/?retryWrites=true&w=majority&appName=TechOf";

const DATABASE_NAME = "tech-of-mongodb-class-04-2024";
const COLLECTION_NAME = "products";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
  try {
    await client.connect();

    const db = client.db(DATABASE_NAME).collection(COLLECTION_NAME);

    const products = await db
      .find({ tags: { $size: 4 } })
      .sort({
        price: -1
      })
      .limit(10)
      .toArray();

    console.log(products)
  } finally {
    client.close();
  }
}

main().catch(console.error);