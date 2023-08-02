import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const body = await req.json();
  const { companyEmail, companyImage, address, phoneNumber } = body;
  const newUser = await prisma.user.update({
    where: {
      email: companyEmail,
    },
    data: {
      role: "vendor",
      address: address,
      phoneNumber: phoneNumber,
      userImages: {
        update: {
          data: {
            imageUrl: companyImage,
          },
          where: {
            userEmail: companyEmail,
          },
        },
      },
      products: {
        create: {
          productName: "",
          productPrice: "",
          productImages: {
            create: {
              imageName: "",
              imageUrl: "",
            },
          },
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
