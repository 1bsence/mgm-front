"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;
export default function Page() {
  const [notifications, setNotifications] = useState([]);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  const [error, setError] = useState(null);
  const [inter2, setInter2] = useState([
    {
      parent: "4b8638f8-2766-4655-9eaa-97cb5fedda53",
      message: "A new project has been created!",
      id: "5d286a5c-0b98-47b2-8a4b-47a9c0974685",
    },
  ]);
  useEffect(() => {
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
    if (loggedIn) {
      const formdata = {
        email: JSON.parse(loggedIn).employee.email,
        password: JSON.parse(loggedIn).employee.password,
      };
      const user = fetch(endpoint + "/login", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(formdata),
      }).catch(function (error) {
        console.log(
          "There was a problem with the fetch operation: " + error.message
        );
      });
      user.then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setNotifications(data.employee.notifications);
          });
        } else {
          console.log(
            "There was a problem with the fetch operation: " + error.message
          );
          return (
            <h1>
              There was a problem with the fetch operation: {error.message}
            </h1>
          );
        }
      });
    }
  }, [loggedIn, error]);
  const router = useRouter();

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
                <button className="btn-style">DISSMIS</button>
                <button className="btn-style">ACCEPT</button>
                <button className="btn-style">REJECT</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
