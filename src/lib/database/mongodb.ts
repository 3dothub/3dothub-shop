import { MongoClient, type Db } from "mongodb";

let clientPromise: Promise<MongoClient> | null = null;

const normalizeMongoUri = (value: string) => {
  let uri = value.trim();

  if (uri.startsWith("MONGODB_URI=")) {
    uri = uri.slice("MONGODB_URI=".length).trim();
  }

  if (
    (uri.startsWith('"') && uri.endsWith('"')) ||
    (uri.startsWith("'") && uri.endsWith("'"))
  ) {
    uri = uri.slice(1, -1).trim();
  }

  return uri;
};

const getClient = async () => {
  const rawUri = process.env.MONGODB_URI;
  if (!rawUri) {
    throw new Error("Missing MONGODB_URI in environment");
  }

  const uri = normalizeMongoUri(rawUri);
  if (!(uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))) {
    throw new Error(
      "Invalid MONGODB_URI format. It must start with mongodb:// or mongodb+srv://"
    );
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
