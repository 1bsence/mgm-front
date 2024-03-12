"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;
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
  useEffect(() => {
  }, [loggedIn, error]);
  const router = useRouter();
  if (router.isFallback || !loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!loggedIn) {
    redirect("/api/auth/login");
  }
  return (
    <div className="flex flex-col items-center my-52 px-3">
      <h1>ADMIN PAGE</h1>
      <h1>{`Employee SIGNUP URL->  ${app_url}/api/auth/signup/${currUser?.organization?.id}?name=${currUser?.organization?.name}`}</h1>
    </div>
  );
}
