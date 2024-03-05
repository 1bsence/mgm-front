"use client";


import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      return localStorage.getItem("userData");
    }
  });
  console.log(loggedIn);
  const [loggedOut, setLoggedOut] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (loggedOut) {
      localStorage.removeItem("userData");
      redirect("/api/auth/login");
    }
  }, [loggedOut, error]);
  return (
    <>
      <button
        onClick={() => {
          setLoggedOut(true);
        }}
      >
        LOG OUT
      </button>
    </>
  );
  //}
}
