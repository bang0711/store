"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
type Props = {
  session: any;
};

function CreateForm({ session }: Props) {
  const [data, setData] = useState({
    email: session?.user?.email,
    productPrice: "",
    productName: "",
    productImage: "",
    category: "",
    productQuantity: 0,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const options = ["Technology", "Beauty", "Fashion"];
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (/[^0-9]/.test(data.productPrice)) {
      toast.error("Please enter a valid product price");
      setIsLoading(false);
      return;
    }
    const res = await fetch("/api/create-product", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Create Failed.");
      setIsLoading(false);
      return;
    }
    toast.success("Create Success");
    setData({
      productImage: "",
      productName: "",
      productPrice: "",
      email: session?.user?.email,
      category: "",
      productQuantity: 0,
    });
    setIsLoading(false);
    router.refresh();
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    // Convert the selected image to base64
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setData({ ...data, productImage: base64Image });
      };
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Create Product</h1>
      <div>
        <label
          htmlFor="image"
          className="cursor-pointer shadow-md w-fit px-3 py-1 rounded-lg border border-gray-200"
        >
          Upload
        </label>
        <input
          type="file"
          className="hidden"
          onChange={handleImageUpload}
          name="image"
          id="image"
        />
      </div>
      {data.productImage !== "" && (
        <Image
          alt="Logo"
          src={data.productImage}
          width={300}
          height={300}
          className="w-40 h-40 "
        />
      )}
      <div>
        <label htmlFor="name">Product name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your product name"
          value={data.productName}
          onChange={(e) => setData({ ...data, productName: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="price">Product price ($)</label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Enter your product price"
          value={data.productPrice}
          onChange={(e) => setData({ ...data, productPrice: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="quantity">Product quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Enter your product quantity"
          value={data.productQuantity}
          onChange={(e) =>
            setData({ ...data, productQuantity: e.target.valueAsNumber })
          }
        />
      </div>
      <select
        name="category"
        id="category"
        value={data.category}
        onChange={(e) => setData({ ...data, category: e.target.value })}
        className="outline-none border border-black p-3 rounded-lg"
      >
        <option disabled value="">
          Select a category
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="submit-btn"
        disabled={
          isLoading ||
          !data.productImage ||
          !data.productPrice ||
          !data.productName
        }
      >
        {isLoading ? (
          <svg
            aria-hidden="true"
            className="w-7 h-7 text-white animate-spin fill-black"
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
          "Create "
        )}
      </button>
    </form>
  );
}

export default CreateForm;
