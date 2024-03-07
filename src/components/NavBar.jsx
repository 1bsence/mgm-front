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
  "rounded-md shadow-md flex flex-row items-center justify-center md:justify-start md:px-1 my-4 w-full h-8 my-2 hover:text-primary hover:bg-accent2  text-secondary";

const btnStyle =
  "text-secondary bg-accent1 hover:bg-accent2  w-20 shadow-md h-8 hover:shadow-inner px-2 py-1";

const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "https://atc-2024-mgm-be-linux-web-app.azurewebsites.net";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://mgm-front.vercel.app";

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
    <nav
      name="DEPARTMENT DESKTOP"
      className={"bg-primary h-screen w-14 md:w-40 p-2 sticky left-0"}
    >
      <div className="w-10 h-14 md:w-10/12 md:h-36">
        <div className="flex flex-row  justify-center items-center md:p-2">
          <Image src={logoimg} priority alt="logo" width={90} className="" />

          <h3 className="text-secondary text-2xl md:block hidden">MGM</h3>
        </div>
      </div>

      <hr name="BREAKING POINT" className="bg-secondary h-1" />

      <div name="ORG SECTION">
        <h2 className="text-secondary text-xl my-2 md:block hidden">
          Organization
        </h2>

        <ul className="space-y-2 rounded">
          <li>
            <Link href="/">
              <button name="home button" className={liStil}>
                <Image src={homeIcon} alt="Home icon" width={30} className="" />
                <h3 className="hidden md:block">Home</h3>
              </button>
            </Link>
          </li>

          <li>
            <Link href="/project">
              <button className={liStil}>
                <Image src={workingIcon} alt="working icon" width={30} />

                <h3 className="hidden md:block">Project</h3>
              </button>
            </Link>
          </li>

          <li>
            <Link href="/department">
              <button name="department button" className={liStil}>
                <Image src={employeeIcon} alt="employee icon" width={30} />

                <h3 className="hidden md:block">Departments</h3>
              </button>
            </Link>
          </li>
        </ul>
      </div>

      <hr name="BREAKING POINT" className="bg-secondary h-1 my-2" />

      <div name="ACCOUNT SECTION">
        <h2 className="text-secondary text-xl my-2 hidden md:block">Account</h2>

        <ul className="space-y-2">
          <li>
            <button
              name="logout button"
              onClick={() => {
                setLoggedOut(true);
              }}
              className={liStil}
            >
              <Image src={logoutIcon} alt="logout icon" width={30} />

              <h3 className="md:block hidden">Logout</h3>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
