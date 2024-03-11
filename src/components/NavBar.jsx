"use client";

import logoimg from "@/public/logo-black-removebg-preview.png";

import Image from "next/image";
import { usePathname } from "next/navigation";
import homeIcon from "@/public/icons/home_icon.svg";
import employeeIcon from "@/public/icons/employee_icon.svg";
import loginICon from "@/public/icons/login_icon.svg";
import logoutIcon from "@/public/icons/logout.svg";
import workingIcon from "@/public/icons/working_icon.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import "@/styles/globals.css";

const apiURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_ENDPOINT
    : process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;

const url =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_APP_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;
const navigation_items = [
  {
    name: "Admin",
    icon: loginICon,
    path: "/admin",
    permmision: "Administrator",
  },
  {
    name: "Home",
    icon: homeIcon,
    path: "/",
    permmision: "Employee",
  },
  {
    name: "Project",
    icon: workingIcon,
    path: "/project",
    permmision: "Administrator",
  },
  {
    name: "Departments",
    icon: employeeIcon,
    path: "/department",
    permmision: "Administrator",
  },
  {
    name: "Employees",
    icon: employeeIcon,
    path: "/employees",
    permmision: "Administrator",
  },
];

export default function NavBar() {
  const pathName = usePathname();
  const display = pathName.includes("api/auth") ? " hidden" : " block";
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });

  const [loggedOut, setLoggedOut] = useState(null);
  const [error, setError] = useState(null);
  const currUser = loggedIn ? JSON.parse(loggedIn).employee : null;
  useEffect(() => {
    if (loggedOut) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userData");
        redirect("/api/auth/login");
      }
    }
  }, [loggedOut, error, currUser]);

  if (display === " hidden") {
    return null;
  }
  return (
    <nav className="h-screen w-14 md:w-36 sticky left-0 top-0">
      <div className="w-10 h-14 md:w-10/12 md:h-36">
        <div className="flex flex-row  justify-center items-center md:p-2">
          <Image src={logoimg} priority alt="logo" width={70} className="" />

          <h3 className="text-2xl md:block hidden">MGM</h3>
        </div>
      </div>

      <hr name="BREAKING POINT" className="bg-chill-accent mx-2 h-1" />

      <div name="ORG SECTION">
        <h4 className=" md:block hidden mx-2">Organization</h4>
        {navigationList(navigation_items, currUser)}
      </div>
      <hr name="BREAKING POINT" className="bg-chill-accent mx-2 h-1" />
    </nav>
  );
}

function navigationList(items, currUser) {
  return (
    <ul>
      {items.map((item, index) => {
        if (item.permmision === "Employee") {
          return (
            <li className="my-6 mx-2" key={index}>
              <Link className="no-underline" href={item.path}>
                <button className="list-style-item">
                  <Image src={item.icon} alt={item.name} width={30} />
                  <h4 className="hidden md:block">{item.name}</h4>
                </button>
              </Link>
            </li>
          );
        } else if (currUser.roles.includes(item.permmision)) {
          return (
            <li className="my-6 mx-2" key={index}>
              <Link className="no-underline" href={item.path}>
                <button className="list-style-item">
                  <Image src={item.icon} alt={item.name} width={30} />
                  <h4 className="hidden md:block">{item.name}</h4>
                </button>
              </Link>
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
}