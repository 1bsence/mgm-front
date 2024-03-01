"use client";

import { signIn } from "next-auth/react";
import { useRef } from "react";

export default function Login() {
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async (e) => {
    const result = await signIn("credentials", {
      email: "ceva@gmail.com",
      password: "1234",
      redirect: false,
      callbackUrl: "/",
    });
  };
  return (
    <div className="bg-pink-400 w-3/4 h-20 shadow-lg">
      <input type="text" ref={email} placeholder="email" className="" />
      <input
        type="password"
        ref={password}
        placeholder="password"
        className=""
      />
      <button onClick={onSubmit}>Signin</button>
    </div>
  );
}
