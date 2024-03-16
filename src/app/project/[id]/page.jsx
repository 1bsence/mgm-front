"use client";

import React, { useState, useEffect } from "react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const local_endpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const production_endpoint = process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? local_endpoint : production_endpoint;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;

export default function Project() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("userData") || null;
      return data;
    }
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      const getProjectslist = async () => {
        const formData = {
          organization: { id: JSON.parse(loggedIn).organization.id },
          project: { id: pathname.split("/")[2] },
        };
        await fetch(`${endpoint}/project/read`, {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: JSON.stringify(formData)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setProjects(data);
            })
            .catch((error) => {
              setError(error);
            }),
        });
      };
    } else if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);
  console.log(projects);
  if (router.isFallback || !loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="p-5 w-min:100 h-screen overflow-auto">Project Page</div>
    );
  }
}