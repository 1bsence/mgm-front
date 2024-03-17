"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { redirect, usePathname, useSearchParams } from "next/navigation";

const localEndpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const productionEndpoint = process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;
const localAppUrl = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const productionAppUrl = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? localEndpoint : productionEndpoint;
const appUrl =
  process.env.NODE_ENV === "development" ? localAppUrl : productionAppUrl;

export default function Project() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState(null);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("userData") || null;
      return data;
    }
    return null;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      const getProjectsList = async () => {
        const formData = {
          organization: { id: JSON.parse(loggedIn).organization.id },
          project: { id: pathname.split("/")[2] },
        };
        try {
          const response = await fetch(`${endpoint}/project/read`, {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          setProjects(data);
        } catch (error) {
          setError(error);
        }
      };
      getProjectsList();
    } else {
      redirect("/api/auth/login");
    }
  }, [loggedIn]);

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
