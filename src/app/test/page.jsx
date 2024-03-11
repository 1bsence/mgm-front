"use client";
import { useEffect, useState } from "react";
import "@/styles/globals.css";

const local_endpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const production_endpoint = process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;
const endpoint =
  process.env.NODE_ENV === "development" ? local_endpoint : production_endpoint;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;
export default function Test({ employeeId }) {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("userData")) || null;
    }
  });
  const user = loggedIn.employee;
  const org_id = loggedIn.organization.id;
  const [rolesChecked, setRolesChecked] = useState([]);
  const [rolesUnchecked, setRolesUnchecked] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
    if (user && user.roles) {
      setRolesChecked(user.roles.map((urole) => ({ role: urole, add: "+" })));
    }
  }, [loggedIn, error, user]);
  const list_roles = [
    "Adinistator",
    "Department Manager",
    "Project Manager",
    "employee",
  ];

  return (
    <div className="sm:w-96 sm:h-96 w-64 h-64  rounded-md shadow-md">
      <h1>{user.name}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const sendPromotion = async () => {
            const res = await fetch(`${endpoint}/promotion`, {
              method: "POST",
              headers: {
                accept: "application/json",
              },
              body: JSON.stringify({
                organization: org_id,
                employee: employeeId,
                roles: rolesChecked,
              }),
            }).catch((err) => {
              console.log(err);
            });
            if (res.status === 204) {
              console.log("employee promoted");
            } else {
              console.log("employee not promoted", res);
            }
          };
        }}
      >
        {list_roles.map((role, key) => {
          return (
            <div key={key} className="">
              <input
                type="checkbox"
                name={role}
                id={role}
                value={role}
                checked={rolesChecked?.some((r) => r.role === role)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setRolesChecked((prevRoles) => [
                      ...prevRoles,
                      { role: e.target.value, add: "+" },
                    ]);
                    setRolesUnchecked((prevRoles) =>
                      prevRoles.filter((role) => role.role !== e.target.value)
                    );
                  } else {
                    setRolesChecked((prevRoles) =>
                      prevRoles.filter((role) => role.role !== e.target.value)
                    );
                    setRolesUnchecked((prevRoles) => [
                      ...prevRoles,
                      { role: e.target.value, add: "-" },
                    ]);
                  }
                }}
              />
              <label htmlFor={role}>{role}</label>
            </div>
          );
        })}
        <button className="btn-style rounded-md shadow-md" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
