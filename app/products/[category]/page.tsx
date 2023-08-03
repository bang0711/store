import React from "react";
import { PrismaClient } from "@prisma/client";
import ProductList from "@/components/ProductList";
type Props = {
  params: {
    category: string;
  };
};
const prisma = new PrismaClient();
async function ProductsPage({ params: { category } }: Props) {
  const products = await prisma.product.findMany();
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;
