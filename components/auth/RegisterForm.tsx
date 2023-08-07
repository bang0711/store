import React from "react";
import Link from "next/link";
import bcrypt from "bcrypt";
import { prisma } from "@/app/db";
type Props = {};
function RegisterForm({}: Props) {
  async function register(data: FormData) {
    "use server";
    console.log(data);
    const email = data.get("email");
    const password = data.get("password");
    const username = data.get("username");
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });
    if (user) {
      throw new Error("User already exist");
    }
    const hashedPassword = await bcrypt.hash(password as string, 15);
    await prisma.user.create({
      data: {
        hashedPassword: hashedPassword,
        role: "user",
        username: username as string,
        email: email as string,
      },
    });
  }
  return (
    <form action={register} className="form">
      <h1 className="title">Register</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email "
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className="submit-btn">
        Register
      </button>
      <p className="flex items-center justify-center">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="font-bold underline-offset-4 underline shadow-none"
        >
          Login Now!
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
