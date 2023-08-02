import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function DELETE(req: Request) {
  const body = await req.json();

  const { email } = body;
  await prisma.user.delete({
    where: {
      email: email,
    },
  });

  await prisma.product.deleteMany({
    where: {
      shopEmail: email,
    },
  });
  return NextResponse.json("Done");
}
