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
    companyName: "",
    address: "",
    phoneNumber: "",
    companyImage: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return <form>CreateForm</form>;
}

export default CreateForm;
