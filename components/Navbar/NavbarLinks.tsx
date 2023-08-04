"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Options from "./Options";
type Props = {
  number: number;
  user: any;
};

function NavbarLinks({ number, user }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Link href={`order/${user?.email}`} className="hidden md:flex relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
            clipRule="evenodd"
          />
        </svg>
        <span className="bg-white text-black border-2 font-medium w-5 h-5 rounded-full flex items-center justify-center p-1 text-sm absolute -top-1 -right-1">
          {number}
        </span>
      </Link>
      <Options number={number} user={user} />
    </div>
  );
}

export default NavbarLinks;
