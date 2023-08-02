import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const body = await req.json();
  const { companyName, address, phoneNumber, companyImage, email } = body;
  if (!companyName || !address || !phoneNumber || !companyImage || !email) {
    return new NextResponse("Missing required fields.", { status: 400 });
  }
  const request = await prisma.vendorRequest.findUnique({
    where: {
      companyName: companyName,
      companyEmail: email,
    },
  });
  if (request) {
    return new NextResponse("Request already sent.", { status: 400 });
  }

  const newRequest = await prisma.vendorRequest.create({
    data: {
      companyEmail: email,
      companyImage: companyImage,
      companyName: companyName,
      CompanyAddress: address,
      companyPhoneNumber: phoneNumber,
    },
  });
  return NextResponse.json(newRequest);
}
