import { NextResponse } from "next/server";
import getSteps from "@/lib/getSteps";

export async function GET() {
  const steps = await getSteps();
  return NextResponse.json(steps);
}
