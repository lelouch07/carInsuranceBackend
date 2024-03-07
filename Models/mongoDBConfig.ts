
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://7chinmay7dev:G21QXvQNfMlvWacX@cluster0.93fyy26.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        // const database=await client.db("admin");
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client;
    }catch
    {
        console.log("Error connecting MongoDB!");
    }
}


const dbName = "insurance"

export async function createCollection(collectionName: string) {
    try {
        // Connect to the MongoDB server
        // await client.connect();

        // Get a reference to the database
        const client = await run();
        const database = client.db(dbName)
        // Check if the collection already exists
        const collections = await database.listCollections().toArray();
        const collectionExists = collections.some((collection: any) => collection.name === collectionName);

        // If the collection doesn't exist, create it
        if (!collectionExists) {
            await database.createCollection(collectionName);
            console.log(`Collection "${collectionName}" created successfully`);
        } else {
            console.log(`Collection "${collectionName}" already exists`);
        }
    } catch (error) {
        // Log any errors that occur during the connection or collection creation process
        console.error('Error creating collection:', error);
    }
}

export default dbName;