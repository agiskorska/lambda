import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import {
  mockDocument
} from './mockData'
dotenv.config();

describe('navbar collection', () => {
  let client: MongoClient;
  let collection: any;
  let databaseTest;
  let dbTest = process.env.MONGODB_DATABASE_TEST!;
  const usernameTest = encodeURIComponent(process.env.MONGODB_USER!);
  const passwordTest = encodeURIComponent(process.env.MONGODB_PASSWORD!);
  const clusterTest = process.env.MONGODB_CLUSTER!;

  beforeAll(async () => {
    const mongoClientConfig = { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      serverApi: ServerApiVersion.v1 
    }
    const uri = `mongodb+srv://${usernameTest}:${passwordTest}@${clusterTest}/${dbTest}?retryWrites=true&w=majority`;
    client = new MongoClient(uri, mongoClientConfig);
    await client.connect();
    databaseTest = client.db(dbTest);
    collection = databaseTest.collection('navbar');
    const result = await collection.insertOne(mockDocument);
    console.log(`Inserted document with ID: ${result.insertedId}`);    
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
