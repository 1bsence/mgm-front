"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

var currUser = null;
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
  useEffect(() => {}, [loggedIn, error]);
  const router = useRouter();

  if (!loggedIn) {
    redirect("/api/auth/login");
  }
  if (router.isFallback || !loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center my-52 px-3">
        <h1>ADMIN PAGE</h1>
        <h1>{`Employee SIGNUP URL->  ${app_url}/api/auth/signup/${
          JSON.parse(loggedIn).organization?.id
        }?name=${JSON.parse(loggedIn)?.organization?.name}`}</h1>
      </div>
    );
  }
}
