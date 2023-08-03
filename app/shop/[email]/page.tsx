import React from "react";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { redirect } from "next/navigation";
type Props = {
  params: {
    email: string;
  };
};
const prisma = new PrismaClient();
async function ShopPage({ params: { email } }: Props) {
  const currentUser = await prisma.user.findUnique({
    where: {
      email: email.replace("%40", "@"),
    },
    select: {
      products: true,
      email: true,
      companyName: true,
      id: true,
      role: true,
      username: true,
      userImage: true,
    },
  });
  if (!currentUser) {
    redirect("/");
  }
  const products = await prisma.product.findMany({
    where: {
      userId: currentUser?.id,
    },
  });
  return (
    <div>
      {currentUser?.userImage === "" ? (
        <div>
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
          <h1 className="title text-center">{currentUser.username}</h1>
        </div>
      ) : (
        <div>
          <Image
            alt={currentUser?.username as string}
            width={200}
            height={200}
            src={currentUser?.userImage as string}
            className="w-24 h-24 rounded-full mx-auto"
          />

          {currentUser?.role === "vendor" && (
            <h1 className="title text-center">{currentUser.companyName}</h1>
          )}
        </div>
      )}
      <h1 className="title">
        {products.length - 1} {products.length <= 1 ? "product" : "products"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
        {products.slice(1, products.length).map((product) => (
          <ProductCard
            email={email}
            key={product.id}
            product={product}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
