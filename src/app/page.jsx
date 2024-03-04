"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("userData")));
  const [loggedOut, setLoggedOut] = useState(null);
  useEffect(() => {
    console.log("LOGGED IN", loggedIn);
    if (loggedOut) {
      localStorage.removeItem("userData");
      redirect("/api/auth/login");
    }
  }, [loggedIn, loggedOut]);
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
