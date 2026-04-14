/* eslint-disable @typescript-eslint/no-explicit-any */
import dns from "dns";
import { MongoClient } from "mongodb";

// Node.js's DNS resolver may point to 127.0.0.1 (e.g. left by WSL/Docker/VPN).
// Override with public DNS servers so mongodb+srv:// SRV lookups work.
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
