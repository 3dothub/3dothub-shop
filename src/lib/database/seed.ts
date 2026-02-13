import type { Db, Document, OptionalUnlessRequiredId } from "mongodb";
import { mockDataCollections } from "@/lib/mockdata";

let seedPromise: Promise<void> | null = null;

const collectionEntries = [
  { name: "products", data: mockDataCollections.products },
  { name: "sections", data: mockDataCollections.sections },
  { name: "shopCategories", data: mockDataCollections.shopCategories },
  { name: "specialOccasions", data: mockDataCollections.specialOccasions },
  { name: "subCategories", data: mockDataCollections.subCategories },
] as const;

const ensureCollectionExists = async (db: Db, name: string) => {
  const existing = await db.listCollections({ name }).toArray();
  if (existing.length === 0) {
    await db.createCollection(name);
  }
};

const syncCollections = async (db: Db) => {
  for (const entry of collectionEntries) {
    await ensureCollectionExists(db, entry.name);

    const collection = db.collection<Document>(entry.name);
    await collection.deleteMany({});

    if (entry.data.length > 0) {
      const documents =
        entry.data as unknown as OptionalUnlessRequiredId<Document>[];

      await collection.insertMany(
        documents,
        {
          ordered: false,
        }
      );
    }
  }
};

export const ensureMongoSeeded = async (
  db: Db,
  options: { forceSync?: boolean } = {}
) => {
  if (options.forceSync) {
    seedPromise = null;
    await syncCollections(db);
    return;
  }

  if (!seedPromise) {
    seedPromise = syncCollections(db);
  }

  await seedPromise;
};
