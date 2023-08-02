import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
type Props = {};

async function LoginPage({}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div className="div">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
