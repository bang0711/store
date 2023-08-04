"use client";
import React from "react";
import { signOut } from "next-auth/react";

type Props = {};

function Button({}: Props) {
  return (
    <button onClick={() => signOut()} className="text-sm">
      Sign Out
    </button>
  );
}

export default Button;
