"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import profileImg from "@/public/logo-black-removebg-preview.png";
import "@/styles/globals.css";

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

export default function Page() {
  const [loggedIn, setLoggedIn] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoggedIn(() => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("userData") || null;
      }
    });
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);
  if(!department){
    return <div>loading...</div>
  }
  return (
    <div className="flex flex-col items-center">
      <div
        name="department info container"
        className="bg-white text-black w-3/4 rounded-md shadow-md px-3 flex flex-row justify-between"
      >
        <h1>{department?.name}</h1>
        <div className="flex flex-row justify-center space-x-2">
          <h3>Employees:</h3>
          <h3>+</h3>
          <h3>{department?.employees.length}</h3>
          <h1> - </h1>
        </div>
      </div>
      <div
        name="manager info container"
        className="bg-primary text-secondary w-11/12 px-3 py-1 my-5 rounded-md shadow-md"
      >
        <div className="flex flex-col items-center">
          <Image
            priority
            src={profileImg}
            alt="Mangager profile image"
            width={50}
          />
          <h1>{department?.manager.name}</h1>
          <hr className="h-1 w-3/4 shadow-md bg-accent2" />
        </div>
        <div name="employee container" className="bg-primary overflow-hidden">
          <div className="flex flex-row items-center justify-between px-5">
            <h1>Employees:</h1> <h1>Manage</h1>
          </div>
          {show_Employees(department?.employees)}
        </div>
      </div>
    </div>
  );
}

function show_Employees(employees) {
  return (
    <div className="w-full  max-h-96 overflow-auto ">
      <ul className="flex flex-col md:grid md:grid-cols-2 md:grid-flow-row px-4 md:items-cente md:justify-between">
        {department?.employees.map((employee) => (
          <li key={employee.id} className="">
            <div className="rounded-md shadow-md m-2 mx-2 px-2 items-center w-34 lg:min-w-80 flex flex-row justify-between md:min-w-60 ">
              <Image priority src={profileImg} alt="profile image" width={40} />
              <h1>{employee.name}</h1>
              <h1>Woking Hours: 2/3</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}