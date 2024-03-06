"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import profile from "@/public/logo-black-removebg-preview.png";
import Image from "next/image";

const department = [
  {
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
    ],
  },
  {
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
    ],
  },
  {
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
    ],
  },
];

export default function Department() {
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
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);
  return (
    <div className="p-5 bg-blue-500 h-screen overflow-hidden">
      <div className="">
        {department.map((dep, key) => {
          return (
            <div
              name="department-card"
              key={key}
              className="bg-red-500 w-52 h-80 rounded-md shadow-lg m-5 p-3 overflow-hidden"
            >
              <div name="DEPARTAMENT NAME">
                <h1 className="text-lg text-center">{dep.name}</h1>
              </div>
              <hr className="h-1 shadow-md" />
              <div
                name="DEPARTAMENT MANAGER"
                className="flex flex-col items-center justify-center"
              >
                <Image src={profile} alt="profile" width={50} />
                <h5>{dep.manager.name}</h5>
              </div>
              <hr className="h-1 shadow-md" />
              <div name="EMPLOYEE LIST" className="flex flex-wrap">
                {dep.employees.map((emp, key) => {
                  return (
                    <div
                      key={key}
                      className="grid grid-cols-1 shadow-sm grid-rows-2 m-2 w-10"
                    >
                      <Image
                        className=""
                        src={profile}
                        alt="profile"
                        width={30}
                      />
                      <h5>{emp.name}</h5>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
