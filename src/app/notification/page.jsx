"use client";

import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

export default function Page() {
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!loggedIn) {
      redirect("/api/auth/login");
    } else if (loggedIn) {
      const formdata = {
        organization: JSON.parse(loggedIn).organization.id,
        id: JSON.parse(loggedIn).employee.id,
      };
      fetch(`${endpoint}/employee/seenotifications`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log(data, " new notifications data  notif page");
              setNotifications(data);
            });
          }
        })
        .catch((error) => {
          console.log(
            "There was a problem with the fetch operation: " + error.message
          );
        });
    }
  }, [loggedIn, error]);
  const handleReload = () => {
    router.push(`${pathname}?refresh=${new Date().getTime()}`);
  };
  if (!loggedIn) {
    return <div>loading...</div>;
  } else
    return (
      <div>
        <ul name="NOTIFICATIONS LIST">
          {notifications &&
            notifications.map((notification, index) => (
              <li
                key={notification.id}
                className="flex flex-row justify-between items-center px-2 py-2 border-b-2 border-glow-type1 bg-bgbackground hover:bg-glow-type1 transition-all duration-300 ease-in-out"
              >
                <div>
                  <p>{notification.message}</p>
                </div>
                <div className="flex flex-row justify-evenly items-center">
                  <button
                    onClick={() => {
                      const user = JSON.parse(loggedIn);
                      handleDismiss(notification, user);
                      handleReload();
                    }}
                    className="btn-style"
                  >
                    DISSMIS
                  </button>
                  {/* <button
                    onClick={() => {
                      handleReload();
                    }}
                    className="btn-style"
                  >
                    ACCEPT
                  </button>
                  <button className="btn-style">REJECT</button> */}
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
}
const handleDismiss = async (notigicaation, user) => {
  const formdata = {
    organization: user.organization.id,
    id: notigicaation.id,
    parent: notigicaation.parent,
    response: "dissmis",
  };
  await fetch(`${endpoint}/notification`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: JSON.stringify(formdata),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data, "notification dissmissed");
          alert("Notification dissmissed!");
        });
      }
    })
    .catch((error) => {
      console.log(
        "There was a problem with the fetch operation: " + error.message
      );
    });
};