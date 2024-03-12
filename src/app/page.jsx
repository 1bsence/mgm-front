"use client";


import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);
  const router = useRouter();
  if (router.isFallback || !loggedIn) {
    return <div className="h-full w-full flex flex-col items-center justify-center">Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center my-52">
      HOME PAGE
      <h1 className="flex flex-wrap">home</h1>
    </div>
  );
}
