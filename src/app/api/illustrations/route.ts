import { NextResponse } from "next/server";
import getIllustrations from "@/lib/getIllustrations";

export async function GET() {
  const illustrations = await getIllustrations();
  return NextResponse.json(illustrations);
}
