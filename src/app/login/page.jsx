"use client";

import { signIn } from "next-auth/react";
import { useRef } from "react";

export default function Login() {
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async (e) => {
    const result = await signIn("credentials", {
      email: "ceva@gmail.com",
      password: "parola",
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className="bg-pink-400 w-3/4 h-20 shadow-lg">
      <button onClick={onsubmit}>Signin</button>
    </div>
  );
}
