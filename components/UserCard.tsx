"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {
  user: any;
};

function UserCard({ user }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const deleteAccount = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/delete-user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      toast.error(`Failed to delete ${user.email}`);
      setIsLoading(false);
      return;
    }

    toast.success("User deleted successfully");
    setIsLoading(false);
    router.refresh();
  };
  return (
    <Link
      href={`/shop/${user.email}`}
      className="flex flex-col shadow-md border border-gray-200 p-3 rounded-lg gap-1 font-semibold items-center"
    >
      {user?.userImage === "" ? (
        <div className="flex flex-col gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-24 h-24 rounded-full "
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
          <h1>{user.username}</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center">
          <Image
            alt={user!.username}
            width={200}
            height={200}
            src={user!.userImage as string}
            className="w-24 h-24 rounded-full"
          />

          {user?.role === "vendor" ? (
            <h1 className="">{user.companyName}</h1>
          ) : (
            <h1>{user.username}</h1>
          )}
        </div>
      )}
      <p>({user.role})</p>
      <button
        onClick={deleteAccount}
        className="text-white bg-red-600 submit-btn"
      >
        {isLoading ? (
          <svg
            aria-hidden="true"
            className="w-7 h-7 text-red-600 animate-spin fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          "Delete"
        )}
      </button>
    </Link>
  );
}

export default UserCard;
