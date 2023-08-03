import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
const prima = new PrismaClient();
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = await prima.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (!session) {
    return new NextResponse("You are not authenticated.", { status: 400 });
  }
}
