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
      username: username,
      image: "",
      role: "user",
      hashedPassword: hashPassword,
      currentOrder: {
        create: {
          products: {
            create: {
              productName: "",
              productPrice: "",
              productQuantity: 0,
              category: "Technology",
              productImage: "",
            },
          },
        },
      },
      orders: {
        create: {
          products: {
            create: {
              productName: "",
              productPrice: "",
              productQuantity: 0,
              category: "Technology",
              productImage: "",
            },
          },
        },
      },
    },
    include: {
      orders: {
        include: {
          products: true,
        },
      },
      currentOrder: {
        include: {
          products: true,
        },
      },
    },
  });

  return NextResponse.json(newUser);
}
