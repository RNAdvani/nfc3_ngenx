import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

if (!globalThis.mongoose) {
  globalThis.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (globalThis.mongoose.conn) {
    console.log('Connected to existing database');
    
    return globalThis.mongoose.conn;
  }

  if (!globalThis.mongoose.promise) {
    globalThis.mongoose.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => {
      return mongoose.connection;
    });
  }
  globalThis.mongoose.conn = await globalThis.mongoose.promise;
  return globalThis.mongoose.conn;
}

export default connect;