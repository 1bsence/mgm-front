"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import profile from "@/public/logo-black-removebg-preview.png";
import Image from "next/image";
import Link from "next/link";
import PaginateDepartment from "@/components/PaginateEmployees";

export default function Department() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(endpoint + "/department/read", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify({
        organization: {
          id: loggedIn ? JSON.parse(loggedIn).organization.id : null,
        },
        department: {
          id: "1b5f5c5e-0948-4e0e-8886-9b32b8b7fa42",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
      });
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);
  const pageSize = 5;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="p-5 w-min:100 h-screen overflow-auto">
      <PaginateDepartment
        items={department}
        currentdeppage={currentPage}
        pagesize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
