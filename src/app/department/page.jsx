"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import profile from "@/public/logo-black-removebg-preview.png";
import Image from "next/image";
import Link from "next/link";
import PaginateDepartment from "@/components/PaginateDepartment";
const department = {
  id: "5badadsa-d4fe-4a65-b137-ab8dkfakdg",
  name: "Java",
  manager: {
    name: "Chuck Norris",
    id: "5d9b4a73-d4fe-4a65-b137-ab80a2d9b3da",
  },
  skills: [],
  employees: [
    {
      id: "5d9b4a73-d4fe-4a65-b137-ab80a2d9b3da",
      name: "ionut",
      email: "ionut@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-adgfe-4a65-b137-ab80xaadgb3da",
      name: "ionut",
      email: "bbb@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-zxckfalkdsgd",
      name: "ionut",
      email: "ccc@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-ab80a2d9b3da",
      name: "ionut",
      email: "ionut@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-adgfe-4a65-b137-ab80xaadgb3da",
      name: "ionut",
      email: "bbb@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-zxckfalkdsgd",
      name: "ionut",
      email: "ccc@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-ab80a2d9b3da",
      name: "ionut",
      email: "ionut@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-adgfe-4a65-b137-ab80xaadgb3da",
      name: "ionut",
      email: "bbb@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-zxckfalkdsgd",
      name: "ionut",
      email: "ccc@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-ab80a2d9b3da",
      name: "ionut",
      email: "ionut@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-adgfe-4a65-b137-ab80xaadgb3da",
      name: "ionut",
      email: "bbb@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-zxckfalkdsgd",
      name: "ionut",
      email: "ccc@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-ab80a2d9b3da",
      name: "ionut",
      email: "ionut@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-adgfe-4a65-b137-ab80xaadgb3da",
      name: "ionut",
      email: "bbb@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
    {
      id: "5d9b4a73-d4fe-4a65-b137-zxckfalkdsgd",
      name: "ionut",
      email: "ccc@gmail.com",
      password: "mypass",
      role: "employee",
      skills: [],
      rights: {
        id: "employee",
        canDoEverything: "true",
      },
      projects: [],
      department: "Java",
    },
  ],
};
export default function Department() {
  const [loggedIn, setLoggedIn] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoggedIn(() => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("userData") || null;
        return data;
      }
    });
    fetch(endpoint + "department/seeall", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify({
        organization: {
          id: loggedIn ? JSON.parse(loggedIn).organization.id : null,
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
  if (!department) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-5 w-min:100 h-screen overflow-auto">
      {/* <PaginateDepartment
        items={department}
        currentdeppage={currentPage}
        pagesize={pageSize}
        onPageChange={onPageChange}
      /> */}
      dep
    </div>
  );
}
