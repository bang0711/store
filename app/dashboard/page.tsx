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
import Image from "next/image";
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
    select: {
      phoneNumber: true,
      username: true,
      products: {
        select: {
          productName: true,
          productPrice: true,
          productImages: true,
        },
      },
      userImages: {
        select: {
          imageUrl: true,
        },
      },
      role: true,
    },
  });

  return (
    <div className="p-3">
      <div className="text-center font-bold">{user?.role}</div>
      <div className="flex items-center gap-3">
        {user?.role === "admin" && <Link href={"/request"}>Request List</Link>}
        <Button />
      </div>
      {user?.userImages[0].imageUrl === "" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-24 h-24 rounded-full mx-auto"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <Image
          alt={user!.username}
          width={200}
          height={200}
          src={user!.userImages[0].imageUrl}
          className="w-24 h-24 rounded-full mx-auto"
        />
      )}

      <div className="div">
        {user?.role !== "vendor" ? (
          <RequestForm session={session} />
        ) : (
          <div>
            <CreateForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
