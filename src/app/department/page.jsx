"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PaginateDepartment from "@/components/PaginateDepartment";
import { useRouter } from "next/navigation";
import CreateDepartmentBox from "@/components/CreateDepartmentBox";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

export default function Department() {
  const router = useRouter();

  const [departments, setDepartments] = useState();
  const [showCreateDepartmentBox, setShowCreateDepartmentBox] = useState(false);
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
      fetch(endpoint + "/department/seeall", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({ id: JSON.parse(loggedIn).organization.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setDepartments(data);
        });
    } else if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const ToggleShowCreateDepartamnet = (show) => {
    setShowCreateDepartmentBox(show); 
  };
  if (router.isFallback || !loggedIn || !departments) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="p-5 w-min:100 h-screen overflow-auto">
        <PaginateDepartment
          items={departments}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          showCreateDepartment={ToggleShowCreateDepartamnet}
        />
        {showCreateDepartmentBox && (
          <div>
            <CreateDepartmentBox
              showCreateDepartment={ToggleShowCreateDepartamnet}
            />
          </div>
        )}
      </div>
    );
  }
}