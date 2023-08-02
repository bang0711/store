import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
type Props = {};
const prisma = new PrismaClient();
async function HomePage({}: Props) {
  return <div>HomePage</div>;
}

export default HomePage;
