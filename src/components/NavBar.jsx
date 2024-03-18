"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@nextui-org/react";

import logoimg from "@/public/logo-black-removebg-preview.png";
import homeIcon from "@/public/icons/home_icon.svg";
import employeeIcon from "@/public/icons/employee_icon.svg";
import loginIcon from "@/public/icons/login_icon.svg";
import logoutIcon from "@/public/icons/logout.svg";
import shieldPerson from "@/public/icons/shield_person.svg";
import workingIcon from "@/public/icons/working_icon.svg";
import departmentIcon from "@/public/icons/department_icon.svg";
import notificationIcon from "@/public/icons/notifications_FILL0.svg";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

const navigationItemsOrganization = [
  {
    name: "Admin",
    icon: shieldPerson,
    path: "/admin",
    permission: "Administrator",
  },
  {
    name: "Home",
    icon: homeIcon,
    path: "/",
    permission: "Employee",
  },
  // {
  //   name: "Project",
  //   icon: workingIcon,
  //   path: "/project",
  //   permission: "Administrator",
  // },
  {
    name: "Departments",
    icon: departmentIcon,
    path: "/department",
    permission: "Administrator",
  },
  {
    name: "Employees",
    icon: employeeIcon,
    path: "/employees",
    permission: "Administrator",
  },
];

export default function NavBar() {
  const router = useRouter();
  const pathName = usePathname();
  const display = pathName.includes("api/auth") ? "hidden" : "block";
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  const [notifications, setNotifications] = useState([]);
  const [loggedOut, setLoggedOut] = useState(null);
  const [error, setError] = useState(null);
  let currUser = null;

  useEffect(() => {
    if (loggedIn) {
      currUser = JSON.parse(loggedIn);
      const formdata = {
        email: currUser.employee.email,
        password: currUser.employee.password,
      };
      fetch(endpoint + "/login", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setNotifications(data.employee.notifications);
            });
          }
        })
        .catch((error) => {
          console.log(
            "There was a problem with the fetch operation: " + error.message
          );
        });
    }

    if (loggedOut) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userData");
        router.push("/api/auth/login");
      }
    }
  }, [loggedOut, error, loggedIn]);

  if (display === "hidden") {
    return null;
  }

  if (!loggedIn || !notifications) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
        <p>If too much time passes, please refresh the page {"<"} 3</p>
      </div>
    );
  }

  currUser = JSON.parse(loggedIn);
  var path = pathName.split("/")[1];

  
  return (
    <nav className="h-screen w-14 md:w-36 sticky left-0 top-0 bg-gradient-to-tr from-bgforeground to-text-secondary bg-opacity-60 text-black">
      <div className="w-10 h-14 md:w-10/12 md:h-24">
        <div className="flex flex-row justify-center items-center md:p-2">
          <Image src={logoimg} priority alt="logo" width={70} className="" />
          <h3 className="text-2xl md:block hidden">MGM</h3>
        </div>
      </div>

      <hr name="BREAKING POINT" className="bg-chill-accent mx-2 h-1" />

      <div name="ORG SECTION">
        <h4 className="md:block hidden mx-2">Organization</h4>
        {NavigationList(navigationItemsOrganization, currUser)}
      </div>

      <hr name="BREAKING POINT" className="bg-chill-accent mx-2 h-1" />

      <div name="ACCOUNT SECTION">
        <h4 className="md:block hidden mx-2">Account</h4>
        <Link href={"/notification"} passHref>
          <button
            className={
              "list-style-item " +
              ("/notification" === `/${path}`
                ? "bg-bgbackground text-text-normal"
                : "")
            }
          >
            <Badge
              content={
                notifications.length ||
                currUser.employee.notifications.length ||
                0
              }
              color="success"
            >
              <Image src={notificationIcon} alt="notificationIcon" width={30} />
              <h4 className="hidden md:block">Notifications</h4>
            </Badge>
          </button>
        </Link>
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

function NavigationList(items, currUser) {
  
  const pathname = usePathname();
  var path = pathname.split("/")[1];
  return (
    <ul>
      {items.map((item, index) => {
        if (currUser?.employee?.roles?.includes(item.permission)) {
          return (
            <li className={"m-2 "} key={index}>
              <Link href={item.path} passHref>
                <button
                  className={
                    "list-style-item " +
                    (item.path === `/${path}`
                      ? "bg-bgbackground text-text-normal"
                      : "")
                  }
                >
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
