import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import UpdateForm from "@/components/dashboard/UpdateForm";
import CreateForm from "@/components/dashboard/CreateForm";
import RequestForm from "@/components/dashboard/RequestForm";
import Button from "@/components/Button";
import Link from "next/link";
type Props = {};
const prisma = new PrismaClient();
async function DashboardPage({}: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });
  await prisma.$disconnect();
  return (
    <div className="p-3">
      <div className="text-center font-bold">{user?.role}</div>
      <div className="flex items-center gap-3">
        {user?.role === "admin" && <Link href={"/request"}>Request List</Link>}
        <Button />
      </div>

      <div className="div">
        {user?.role !== "vendor" ? (
          <RequestForm session={session} />
        ) : (
          <CreateForm />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
