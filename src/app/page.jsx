"use client";


import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState();
  const [loggedOut, setLoggedOut] = useState(() => {
    return loggedIn === null ? true : false;
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoggedIn(() => {
      if (typeof window !== "undefined") {
        // Perform localStorage action
        setLoggedIn(localStorage.getItem("userData"));
      }
    });

    if (loggedOut) {
      localStorage.removeItem("userData");
      redirect("/api/auth/login");
    }
  }, [loggedOut, error]);
  return (
    <div>
      PROFILE PAGE
      {loggedIn && <h1>Logged In</h1>}
    </div>
  );
  //}
}
