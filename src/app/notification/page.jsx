"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const local_endpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const production_endpoint = process.env.NEXT_PUBLIC_PRRODUCTION_ENDPOINT;
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? local_endpoint : production_endpoint;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;
export default function Page() {
  const [notifications, setNotifications] = useState(null);
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
            console.log(data);
            inter(data);
          });
        } else {
          console.log(
            "There was a problem with the fetch operation: " + error.message
          );
        }
      });
    }
  }, [loggedIn, error, inter2]);
  const router = useRouter();
  const inter = (data) => {
    console.log(data.employee.notifications, "data");
  };

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
          console.log(data.employee.notifications, "187234861278381232199");
          return (
            <div>
              <ul>
                {data.employee.notifications.map((notification, key) => {
                  return (
                    <li key={key}>
                      <div key={notification.id}>
                        caca
                        <p>{notification.message}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        });
      } else {
        console.log(
          "There was a problem with the fetch operation: " + error.message
        );
        return (
          <h1>There was a problem with the fetch operation: {error.message}</h1>
        );
      }
    });
  }
  return (
    <div>
      <ul className="text-text-normal bg-foreground">
        caca
        {inter2 &&
          inter2.map((notification, index) => (
            <li key={notification.id}>
              <div>
                caca
                <p>{notification.message}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

const ListNotification = () => {
  var inter = [];
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
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
          console.log(data.employee.notifications, "187234861278381232199");
          inter = data.employee.notifications;
          return (
            <div>
              <ul>
                {data.employee.notifications.map((notification, key) => {
                  return (
                    <li key={key}>
                      <div key={notification.id}>
                        caca
                        <p>{notification.message}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        });
      } else {
        console.log(
          "There was a problem with the fetch operation: " + error.message
        );
        return (
          <h1>There was a problem with the fetch operation: {error.message}</h1>
        );
      }
    });
  }
  return (
    <div>
      <ul>
        {inter.map((notification, key) => {
          return (
            <li key={key}>
              <div key={notification.id}>
                caca
                <p>{notification.message}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
