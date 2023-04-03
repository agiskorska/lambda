import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

describe('navbar collection', () => {
  let client: MongoClient;
  let collection: any;
  let db = process.env.MONGODB_DATABASE_TEST!;
  let database;
  const username = encodeURIComponent(process.env.MONGODB_USER!);
  const password = encodeURIComponent(process.env.MONGODB_PASSWORD!);
  const cluster = process.env.MONGODB_CLUSTER!;

  beforeAll(async () => {
    const mongoClientConfig = { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      serverApi: ServerApiVersion.v1 
    }
    const uri = `mongodb+srv://${username}:${password}@${cluster}/${db}?retryWrites=true&w=majority`;
    client = new MongoClient(uri, mongoClientConfig);
    await client.connect();
    database = client.db(db);
    collection = database.collection('navbar');
  });

  afterAll(async () => {
    await collection.deleteMany({});
    await client.close();
  });

  test('should find a document in navbar collection', async () => {
    const mockDocument = { navbar: {} };
    await collection.insertOne(mockDocument);
    const result = await collection.findOne({ navbar: {} });
    console.log(result)
    expect(result).toEqual(mockDocument);
  });

  test('should return an error if unable to connect to MongoDB', async () => {
    jest.spyOn(client, 'connect').mockImplementation(() => Promise.reject(new Error('connection error')));
    try {
      await client.connect();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('connection error');
    }
  });
  
});
