"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState();
  const [loggedOut, setLoggedOut] = useState(null);
  useEffect(() => {
    setLoggedIn(() => {
      const userData = localStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    });
    if (loggedOut) {
      localStorage.removeItem("userData");
      redirect("/api/auth/login");
    }
  }, [loggedOut]);
  if (!loggedIn) {
    return <>NO USER DATA</>;
  } else {
    return (
      <>
        Welcome {JSON.stringify(loggedIn)}
        <button
          onClick={() => {
            setLoggedOut(true);
          }}
        >
          DELETE USER
        </button>
      </>
    );
  }
}
