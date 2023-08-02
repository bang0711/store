import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
type Props = {};

async function RegisterPage({}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div className="div">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
