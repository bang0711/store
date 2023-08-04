"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signOut } from "next-auth/react";
type Props = {
  number: number;
  user: any;
};

function Options({ number, user }: Props) {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="relative">
      {user.image === "" ? (
        <svg
          onClick={() => setIsShow(!isShow)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <Image
          onClick={() => setIsShow(!isShow)}
          alt="Logo"
          src={user.image as string}
          width={50}
          height={50}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 cursor-pointer rounded-full"
        />
      )}
      <AnimatePresence>
        {isShow && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}
              className="flex flex-col absolute top-5 sm:top-6 md:top-7 lg:top-8 xl:top-9 right-0 bg-white z-10 border border-gray-200 shadow-md rounded-lg md:hidden"
            >
              <Link
                href={"/dashboard"}
                className="py-2 px-3"
                onClick={() => setIsShow(!isShow)}
              >
                Dashboard
              </Link>
              <hr className="border border-gray-200" />
              <Link
                href={`/order/${user.email}`}
                className="py-2 px-3"
                onClick={() => setIsShow(!isShow)}
              >
                Order ({number})
              </Link>
              <hr className="border border-gray-200" />
              <div className="py-2 px-3">
                <button onClick={() => signOut()} className="text-sm">
                  Sign Out
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}
              className="hidden md:flex flex-col absolute top-5 sm:top-6 md:top-7 lg:top-8 xl:top-9 right-0 bg-white z-10 border border-gray-200 shadow-md rounded-lg "
            >
              <Link
                href={"/dashboard"}
                className="py-2 px-3"
                onClick={() => setIsShow(!isShow)}
              >
                Dashboard
              </Link>
              <hr className="border border-gray-200" />
              <div className="py-2 px-3">
                <button onClick={() => signOut()} className="text-sm">
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Options;
