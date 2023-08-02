import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import RequestList from "@/components/RequestList";
type Props = {};
const prisma = new PrismaClient();
async function RequestPage({}: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  if (user?.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <RequestList />
    </div>
  );
}

export default RequestPage;
