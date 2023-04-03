import * as mongoDB from "mongodb";

export const handler = async (uri: string, db: string, collectionString: string) => {

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);

  try {
    await client.connect();
    const database: mongoDB.Db = client.db(db);
    const collection: mongoDB.Collection = database.collection(collectionString);
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
