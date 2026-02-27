import clientPromise from "./mongodb";

export default async function getIllustrations() {
  try {
    const client = await clientPromise;
    const db = client.db("auralis");

    const illustrations = await db
      .collection("illustrations")
      .find({})
      .toArray();

    return illustrations;
  } catch (error) {
    console.error("Error fetching illustrations:", error);
    return [];
  }
}
