import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const body = await req.json();
  const {
    companyEmail,
    companyImage,
    companyAddress,
    companyPhoneNumber,
    companyName,
    userId,
  } = body;
  console.log(userId);
  const newUser = await prisma.user.update({
    where: {
      email: companyEmail,
    },
    data: {
      role: "vendor",
      address: companyAddress,
      phoneNumber: companyPhoneNumber,
      image: companyImage,
      companyName: companyName,
      purchaseRequests: {
        create: {
          customerAddress: "",
          customerEmail: "",
          customerPhoneNumber: "",
          customerUsername: "",
          products: {
            create: {
              category: "Technology",
              productImage: "",
              productName: "",
              productPrice: "",
              productQuantity: 0,
              userId: userId,
            },
          },
        },
      },
      products: {
        create: {
          productName: "",
          productPrice: "",
          productImage: "",
          category: "Technology",
          productQuantity: 0,
        },
      },
    },
    include: {
      products: true,
      purchaseRequests: {
        include: {
          products: true,
        },
      },
    },
  });

  await prisma.vendorRequest.delete({
    where: {
      companyEmail: companyEmail,
    },
  });
  return NextResponse.json(newUser);
}
