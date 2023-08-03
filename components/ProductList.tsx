"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Product from "./Product";
type Props = {
  products: any;
};

function ProductList({ products }: Props) {
  const params = useParams();
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col py-3 gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name=""
        id=""
        placeholder="Enter the product name"
        className="w-full p-3 sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto outline-none border border-gray-200 focus-within:shadow-md rounded-none sm:rounded-lg"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-3">
        {products
          .filter(
            (product: any) =>
              product.productName !== "" &&
              product.category === params.category &&
              product.productName.toLowerCase().includes(name.toLowerCase())
          )
          .map((product: any) => (
            <Product product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}

export default ProductList;
