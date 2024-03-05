"use client";


import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      return localStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
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
      {loggedIn ? "Welcome back, " + JSON.stringify(loggedIn) : "Please log in"}
      <button
        onClick={() => {
          setLoggedOut(true);
        }}
      >
        DELETE USER
      </button>
    </>
  );
  //}
}
