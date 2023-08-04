"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
type Props = {
  session: any;
  user: any;
};

function RequestForm({ session, user }: Props) {
  const [data, setData] = useState({
    email: session?.user?.email,
    companyName: "",
    address: "",
    phoneNumber: "",
    companyImage: "",
    userId: user.id,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (/[^0-9]/.test(data.phoneNumber)) {
      toast.error("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }
    const res = await fetch("/api/create-request", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Request Failed.");
      setIsLoading(false);
      return;
    }
    toast.success("Request Success");
    setData({
      address: "",
      companyImage: "",
      companyName: "",
      email: "",
      phoneNumber: "",
      userId: "",
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
        setData({ ...data, companyImage: base64Image });
      };
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="title">Become Vendor</h1>
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
      {data.companyImage !== "" && (
        <Image
          alt="Logo"
          src={data.companyImage}
          width={300}
          height={300}
          className="w-40 h-40 rounded-full"
        />
      )}
      <div>
        <label htmlFor="name">Company name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your company name"
          value={data.companyName}
          onChange={(e) => setData({ ...data, companyName: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="address">Company address</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter your company address"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phone">Company phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Enter your company phone"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="submit-btn"
        disabled={
          isLoading ||
          !data.address ||
          !data.companyImage ||
          !data.companyName ||
          !data.phoneNumber
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
          "Send "
        )}
      </button>
    </form>
  );
}

export default RequestForm;
