"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PaginateProject from "@/components/PaginateProject";
import { useRouter } from "next/navigation";
import CreateProjectBox from "@/components/CreateProjectBox";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

export default function Project() {
  const router = useRouter();

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
      fetch(endpoint + "/project/seeall", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({ id: JSON.parse(loggedIn).organization.id }),
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
        <PaginateProject
          items={projects}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          showCreateProject={ToggleShowCreateProject}
        />
        {showCreateProjectBox && (
          <div>
            <CreateProjectBox
              showCreateProject={ToggleShowCreateProject}
            />
          </div>
        )}
      </div>
    );
  }
}