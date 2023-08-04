import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Button from "@/components/Button";
import Product from "@/components/Product";
type Props = {};
const prisma = new PrismaClient();
async function HomePage({}: Props) {
  const categories = ["Technology", "Fashion", "Beauty"];
  return (
    <div className="flex flex-col gap-3 divide-y p-0 lg:p-3">
      {categories.map(async (category) => {
        const products = await prisma.product.findMany();
        await prisma.$disconnect();
        return (
          <div key={category}>
            <div className="flex items-center justify-between">
              <p>{category}</p>
              <Link href={`/products/${category}`}>See More</Link>
            </div>
            <div className="flex flex-nowrap lg:hidden w-screen overflow-auto p-3 gap-3">
              {products
                .filter(
                  (product) =>
                    product.productName !== "" && product.category === category
                )
                .slice(0, 5)
                .map((product) => (
                  <Product product={product} key={product.id} />
                ))}
            </div>
            <div className="hidden lg:grid overflow-auto lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
              {products
                .filter(
                  (product) =>
                    product.productName !== "" && product.category === category
                )
                .slice(0, 5)
                .map((product) => (
                  <Product product={product} key={product.id} />
                ))}
            </div>
          </div>
        );
      })}
      {/* <Button /> */}
    </div>
  );
}

export default HomePage;
