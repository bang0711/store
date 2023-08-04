import React from "react";
import { PrismaClient } from "@prisma/client";

type Props = {
  params: {
    email: string;
  };
};
const prisma = new PrismaClient();
async function OrderPage({ params: { email } }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return <div>{email}</div>;
}

export default OrderPage;
