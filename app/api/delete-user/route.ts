import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function DELETE(req: Request) {
  const body = await req.json();

  const { email } = body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const currentOrder = await prisma.currentOrder.findUnique({
    where: {
      userId: user?.id,
    },
  });
  const orders = await prisma.order.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });

  const purchaseRequests = await prisma.purchaseRequest.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });
  const orderIds = orders.map((order) => order.id);
  const purchaseRequestIds = purchaseRequests.map((request) => request.id);
  await prisma.order.deleteMany({
    where: {
      userId: user?.id,
    },
  });
  await prisma.currentOrder.delete({
    where: {
      userId: user?.id,
    },
    include: {
      products: true,
    },
  });
  await prisma.order.deleteMany({
    where: {
      userId: user?.id,
    },
  });
  await prisma.product.deleteMany({
    where: {
      orderId: {
        in: orderIds,
      },
    },
  });
  await prisma.product.deleteMany({
    where: {
      userId: user?.id,
    },
  });

  await prisma.product.deleteMany({
    where: {
      currentOrderId: currentOrder?.id,
    },
  });
  await prisma.product.deleteMany({
    where: {
      purchaseRequestId: {
        in: purchaseRequestIds,
      },
    },
  });
  await prisma.purchaseRequest.deleteMany({
    where: {
      userId: user?.id,
    },
  });
  await prisma.user.delete({
    where: {
      email: email,
    },
  });

  return NextResponse.json("Done", { status: 200 });
}
