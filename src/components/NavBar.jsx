"use client";

import logoimg from "@/public/logo-black-removebg-preview.png";
import { Suspense } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import homeIcon from "@/public/icons/home_icon.svg";
import employeeIcon from "@/public/icons/employee_icon.svg";
import loginICon from "@/public/icons/login_icon.svg";
import logoutIcon from "@/public/icons/logout.svg";
import shieldPerson from "@/public/icons/shield_person.svg";
import workingIcon from "@/public/icons/working_icon.svg";
import departmentIcon from "@/public/icons/department_icon.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import "@/styles/globals.css";
import { useRouter } from "next/navigation";
const apiURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_ENDPOINT
    : process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;

const url =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_APP_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;
const navigation_items_organization = [
  {
    name: "Admin",
    icon: shieldPerson,
    path: "/admin",
    permmision: "Administrator",
  },
  {
    name: "Home",
    icon: homeIcon,
    path: "/",
    permmision: "Employee",
  },
  // {
  //   name: "Test",
  //   icon: homeIcon,
  //   path: "/test",
  //   permmision: "Employee",
  // },
  {
    name: "Project",
    icon: workingIcon,
    path: "/project",
    permmision: "Administrator",
  },
  {
    name: "Departments",
    icon: departmentIcon,
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
const navigation_items_account = [
  {
    name: "Notification",
    icon: loginICon,
    path: "/notification",
    permmision: "Employee",
  },
];

export default function NavBar() {
  const router = useRouter();
  const pathName = usePathname();
  const display = pathName.includes("api/auth") ? " hidden" : " block";
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });

  const [loggedOut, setLoggedOut] = useState(null);
  const [error, setError] = useState(null);
  var currUser = null;
  useEffect(() => {
    if (loggedIn) {
      currUser = JSON.parse(loggedIn);
    }
    if (loggedOut) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userData");
        redirect("/api/auth/login");
      }
    }
  }, [loggedOut, error, loggedIn]);
  if (display === " hidden") {
    return null;
  }
  if (loggedIn) {
    currUser = JSON.parse(loggedIn);
  } else {
    if (router.isFallback) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h1>Loading...</h1>
          <p>If too much passes... please refreh the page {"<"} 3</p>
        </div>
      );
    }
  }
  return (
    <nav className="h-screen w-14 md:w-36 sticky left-0 top-0 bg-gradient-to-tr from-bgforeground to-text-secondary bg-opacity-60 text-black">
      <div className="w-10 h-14 md:w-10/12 md:h-24">
        <div className="flex flex-row  justify-center items-center md:p-2">
          <Image src={logoimg} priority alt="logo" width={70} className="" />

          <h3 className="text-2xl md:block hidden">MGM</h3>
        </div>
      </div>

      <hr name="BREAKING POINT" className="bg-chill-accent mx-2 h-1" />

      <div name="ORG SECTION">
        <h4 className=" md:block hidden mx-2">Organization</h4>
        <Suspense fallback={<div>Loading...</div>}>
          {navigationList(navigation_items_organization, currUser)}
        </Suspense>
      </div>
      <hr name="BREAKING POINT" className="bg-chill-accent mx-2 h-1" />
      <div name="ACCOUNT SECTION">
        <h4 className=" md:block hidden mx-2">Account</h4>
        <Suspense fallback={<div>Loading...</div>}>
          {navigationList(navigation_items_account, currUser)}
        </Suspense>
        <button
          onClick={() => {
            setLoggedOut(true);
          }}
          className="list-style-item"
        >
          <Image src={logoutIcon} alt="logout" width={30} />
          <h4 className="hidden md:block">Logout</h4>
        </button>
      </div>
    </nav>
  );
}

function navigationList(items, currUser) {
  return (
    <ul>
      {items.map((item, index) => {
        if (item.permmision === "Employee") {
          return (
            <li className="my-4 mx-2" key={index}>
              <Link className="no-underline" href={item.path}>
                <button className="list-style-item">
                  <Image src={item.icon} alt={item.name} width={30} />
                  <h4 className="hidden md:block">{item.name}</h4>
                </button>
              </Link>
            </li>
          );
        } else if (currUser?.employee?.roles?.includes(item.permmision)) {
          return (
            <li className="my-4 mx-2" key={index}>
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