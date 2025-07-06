import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log("MONGODB_URI", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'notes_app',
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("Connected to MongoDB",cached.conn.connection.host);
  return cached.conn;
}

export default dbConnect;
