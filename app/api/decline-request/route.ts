import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function DELETE(req: Request) {
  const body = await req.json();
  const { companyEmail } = body;
  await prisma.vendorRequest.delete({
    where: {
      companyEmail: companyEmail,
    },
  });
  return NextResponse.json("Decline successful", { status: 200 });
}
