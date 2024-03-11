"use client";


import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  const [loggedOut, setLoggedOut] = useState(() => {
    return loggedIn === null ? true : false;
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center my-52">
      HOME PAGE
      <h1 className="flex flex-wrap">{JSON.stringify(loggedIn)}</h1>
    </div>
  );
}
