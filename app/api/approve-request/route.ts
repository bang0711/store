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
  } = body;
  const newUser = await prisma.user.update({
    where: {
      email: companyEmail,
    },
    data: {
      role: "vendor",
      address: companyAddress,
      phoneNumber: companyPhoneNumber,
      userImage: companyImage,
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
  });

  await prisma.vendorRequest.delete({
    where: {
      companyEmail: companyEmail,
    },
  });
  return NextResponse.json(newUser);
}
