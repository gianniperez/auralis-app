import clientPromise from "./mongodb";

export default async function getSteps() {
  try {
    const client = await clientPromise;
    const db = client.db("auralis");

    const steps = await db.collection("steps").find({}).toArray();

    return steps;
  } catch (error) {
    console.error("Error fetching steps:", error);
    return [];
  }
}
