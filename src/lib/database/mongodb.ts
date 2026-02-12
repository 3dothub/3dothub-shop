import { MongoClient, type Db } from "mongodb";

let clientPromise: Promise<MongoClient> | null = null;

const getClient = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI in environment");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
};

export const getDb = async (): Promise<Db> => {
  const dbName = process.env.MONGODB_DB;
  if (!dbName) {
    throw new Error("Missing MONGODB_DB in environment");
  }

  const client = await getClient();
  return client.db(dbName);
};
