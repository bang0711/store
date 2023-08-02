import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const body = await req.json();
  const { companyEmail } = body;

  const newUser = await prisma.user.update({
    where: {
      email: companyEmail,
    },
    data: {
      role: "vendor",
    },
  });

  await prisma.vendorRequest.delete({
    where: {
      companyEmail: companyEmail,
    },
  });
  return NextResponse.json(newUser);
}
