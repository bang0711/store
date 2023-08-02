import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return new NextResponse("User already exists.", { status: 400 });
  }
  const hashPassword = await bcrypt.hash(password, 15);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      phoneNumber: "",
      address: "",
      userImage: "",
      username: username,
      role: "user",
      hashedPassword: hashPassword,
    },
  });

  return NextResponse.json(newUser);
}
