import { MongoClient } from "mongodb";
export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://Shivam:JyPehPoRvVZ5WKuI@cluster0.zvxkxd5.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocument(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return documents;
}
