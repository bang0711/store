import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import UserCard from "@/components/UserCard";

type Props = {};
const prisma = new PrismaClient();
async function UserPage({}: Props) {
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

  const allUsers = await prisma.user.findMany({
    select: {
      phoneNumber: true,
      address: true,
      image: true,
      email: true,
      username: true,
      role: true,
      companyName: true,
      id: true,
    },
  });
  await prisma.$disconnect();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {allUsers
        .filter((user) => user.role !== "admin")
        .map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
    </div>
  );
}

export default UserPage;
