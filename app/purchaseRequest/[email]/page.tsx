import React from "react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
type Props = {
  params: {
    email: string;
  };
};
const prisma = new PrismaClient();
async function PurchaseRequestListPage({ params: { email } }: Props) {
  return <div>{email.replaceAll("%40", "@")}</div>;
}

export default PurchaseRequestListPage;
