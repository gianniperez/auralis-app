import clientPromise from "./mongodb";

export default async function getServices() {
  try {
    const client = await clientPromise;
    const db = client.db("auralis");

    const services = await db.collection("services").find({}).toArray();

    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}
