"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
type Props = {
  product: any;
  currentUser: any;
  email: string;
};

function ProductCard({ product, currentUser, email }: Props) {
  const { data } = useSession();

  return (
    <div className="flex flex-col gap-3 shadow-md rounded-lg border border-gray-200 items-center p-2">
      <Image
        alt={product.productName}
        src={product.productImage}
        width={200}
        height={300}
        className="w-52 h-60 rounded-md"
      />
      <p className="font-medium">{product.productName}</p>
      <p>
        Price: <span className="font-medium">{product.productPrice}$</span>
      </p>
      {data?.user?.email === email.replace("%40", "@") ? (
        <div className="flex items-center justify-between gap-2">
          <button className="submit-btn bg-green-600 text-white">Edit</button>
          <button className="submit-btn bg-red-600 text-white">Delete</button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {currentUser.role === "admin" && (
            <div className="flex items-center justify-between gap-2">
              <button className="submit-btn bg-green-600 text-white">
                Edit
              </button>
              <button className="submit-btn bg-red-600 text-white">
                Delete
              </button>
            </div>
          )}
          <button className="submit-btn bg-green-600 text-white">Add</button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
