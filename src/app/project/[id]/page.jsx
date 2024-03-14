"use client";

import React, { useState, useEffect } from "react";
import { redirect,usePathname,useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PaginateProject from "@/components/PaginateProject";
import { useRouter } from "next/navigation";
import CreateProjectBox from "@/components/CreateProjectBox";

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
  const [showCreateProjectBox, setShowCreateProjectBox] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("userData") || null;
      return data;
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    if (loggedIn) {
      fetch(endpoint + "/project/read", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({organization:{ id: JSON.parse(loggedIn).organization.id},project:{id:pathname.split("/")[2] }}),
      })
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
        });
    } else if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const ToggleShowCreateProject = (show) => {
    setShowCreateProjectBox(show);
  };
  if (router.isFallback || !loggedIn || !projects) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="p-5 w-min:100 h-screen overflow-auto">
        {projects.name}
      </div>
    );
  }
}