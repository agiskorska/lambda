import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const username = encodeURIComponent(process.env.MONGODB_USER || '')
const password = encodeURIComponent(process.env.MONGODB_PASSWORD || '')
const cluster = process.env.MONGODB_CLUSTER

export const handler = async (event) => {
  const uri = `mongodb+srv://${username}:${password}@${cluster}/${event.db}?retryWrites=true&w=majority`;
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);
  
  try {
    await client.connect();
    const database: mongoDB.Db = client.db(event.db);
    const collection: mongoDB.Collection = database.collection(event.collectionString);
    const result = await collection.findOne({})
    return result;
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: "Error: Could not retrieve data from MongoDB."
    };
  } finally {
    await client.close();
  }
}
