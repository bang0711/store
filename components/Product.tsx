"use client";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
type Props = {
  product: any;
};

function Product({ product }: Props) {
  return (
    <div className="flex flex-col gap-3 shadow-md rounded-lg border border-gray-200 items-center p-2">
      <Image
        alt={product.productName}
        src={product.productImage}
        width={200}
        height={300}
        className="w-24 md:w-36 lg:w-52 h-28 md:h-40 lg:h-60 rounded-md"
      />
      <p className="font-medium">{product.productName}</p>
      <p className="text-sm md:text-base">
        Price: <span className="font-medium">{product.productPrice}$</span>
      </p>
      <button className="submit-btn bg-green-600 text-white">Add</button>
    </div>
  );
}

export default Product;
