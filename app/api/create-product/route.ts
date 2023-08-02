import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const body = await req.json();
  const { email, productPrice, productName, productImage, category } = body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const product = await prisma.product.findFirst({
    where: {
      productName: productName,
    },
  });
  if (product) {
    return new NextResponse("Product already exists.", { status: 400 });
  }
  const newProduct = await prisma.product.create({
    data: {
      category: category,
      productImage: productImage,
      productName: productName,
      productPrice: productPrice,
      userId: user?.id,
    },
  });
  return NextResponse.json(newProduct);
}
