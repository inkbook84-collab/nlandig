import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;


// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}


async function dbConnect() {
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not defined. Features requiring DB will be disabled.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB Connection Error:', e);
    return null;
  }

  return cached.conn;
}


export default dbConnect;
