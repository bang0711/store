import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
type Props = {};
async function Navbar({}: Props) {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 shadow-md p-3 backdrop-blur-md bg-white/50 z-50">
      <nav className="flex items-center justify-between gap-3">
        <Link href={"/"}>Home</Link>
        {session ? (
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"}>Dashboard</Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href={"/register"}>Register</Link>
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
