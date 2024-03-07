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

const liStil =
  "rounded-md shadow-md flex flex-row items-center space-x-3 w-full h-8 my-4 hover:text-primary hover:bg-accent2  text-secondary";

const btnStyle =
  "text-secondary bg-accent1 hover:bg-accent2  w-20 shadow-md h-8 hover:shadow-inner px-2 py-1";

const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "https://atc-2024-mgm-be-linux-web-app.azurewebsites.net";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://atc-2024-mgm-fe-linux-web-app.azurewebsites.net";

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

  useEffect(() => {
    if (loggedOut) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userData");

        redirect("/api/auth/login");
      }
    }
  }, [loggedOut, error]);

  if (display === " hidden") {
    return null;
  }

  return (
    <div className={"" + display}>
      <nav
        name="DEPARTMENT DESKTOP"
        className={"bg-primary h-screen w-52 p-3 sticky left-0 hidden md:block"}
      >
        <div className=" w-10/12 h-36">
          <div className="flex flex-col justify-center items-center p-3">
            <Image src={logoimg} priority alt="logo" width={70} />

            <h3 className="text-secondary text-2xl">MGM</h3>
          </div>
        </div>

        <hr name="BREAKING POINT" className="bg-secondary h-1" />

        <div name="ORG SECTION">
          <h2 className="text-secondary text-xl my-2">Organization</h2>

          <ul className="space-y-2 rounded">
            <li>
              <button
                onClick={() => {
                  redirect("/home");
                }}
                className={liStil}
              >
                <Image src={homeIcon} alt="Home icon" width={30} />
                <h3>Home</h3>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  redirect("/project");
                }}
                className={liStil}
              >
                <Image src={workingIcon} alt="working icon" width={30} />

                <h3>Project</h3>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  redirect("/department");
                }}
                className={liStil}
              >
                <Image src={employeeIcon} alt="employee icon" width={30} />

                <h3>Departments</h3>
              </button>
            </li>
          </ul>
        </div>

        <hr name="BREAKING POINT" className="bg-secondary h-1 my-2" />

        <div name="ACCOUNT SECTION">
          <h2 className="text-secondary text-xl my-2">Account</h2>

          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setLoggedOut(true);
                }}
                className={liStil}
              >
                <Image src={logoutIcon} alt="logout icon" width={30} />

                <h3>Logout</h3>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <nav
        name="DEPARTMENT MOBILE"
        className={"bg-primary h-screen w-14 p-3 sticky left-0 md:hidden"}
      >
        <div className="h-12">
          <div className="flex flex-row justify-center items-center">
            <Image src={logoimg} priority alt="logo" width={35} />
          </div>
        </div>

        <hr name="BREAKING POINT" className="bg-secondary h-1" />

        <div name="ORG SECTION">
          <ul className="rounded">
            <li>
              <button
                onClick={() => {
                  redirect("/home");
                }}
                className={liStil}
              >
                <Image src={homeIcon} alt="Home icon" width={30} />
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  redirect("/project");
                }}
                className={liStil}
              >
                <Image src={workingIcon} alt="working icon" width={30} />
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  redirect("/department");
                }}
                className={liStil}
              >
                <Image src={employeeIcon} alt="employee icon" width={30} />
              </button>
            </li>
          </ul>
        </div>

        <hr name="BREAKING POINT" className="bg-secondary h-1 my-2" />

        <div name="ACCOUNT SECTION">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setLoggedOut(true);
                }}
                className={liStil}
              >
                <Image src={logoutIcon} alt="logout icon" width={30} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
