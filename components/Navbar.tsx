"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
type Props = {};
function Navbar({}: Props) {
  const { data, status } = useSession();

  return (
    <header className="sticky top-0 shadow-md p-3 backdrop-blur-md bg-white/50 z-50">
      <nav className="flex items-center justify-between gap-3">
        <Link href={"/"}>Home</Link>
        {data && status === "authenticated" ? (
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"}>Dashboard</Link>
          </div>
        ) : !data && status === "loading" ? (
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
