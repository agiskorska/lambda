import * as dotenv from "dotenv";
import * as handlerScript from './index'

dotenv.config();

const db = process.env.MONGODB_DATABASE || ''
const username = encodeURIComponent(process.env.MONGODB_USER || '')
const password = encodeURIComponent(process.env.MONGODB_PASSWORD || '')
const cluster = process.env.MONGODB_CLUSTER
const uri = `mongodb+srv://${username}:${password}@${cluster}/${db}?retryWrites=true&w=majority`;

async function run() {
  const result = await handlerScript.handler(uri, db, 'navbar');
  console.log(result);
}

run()