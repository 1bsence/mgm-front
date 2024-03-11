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

const editEmployeeBox = ({ employee, showEmployeeEditBox }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("userData")) || null;
    }
  });

  const org_id = loggedIn.organization.id;
  const list_roles = [
    "Administrator",
    "Department Manager",
    "Project Manager",
    "Employee",
  ];
  const [rolesChecked, setRolesChecked] = useState(employee.roles);
  const [rolesUnchecked, setRolesUnchecked] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);

  return (
    <div className="p-2">
      <h1 className="flex flex-row justify-center">
        Edit {employee.name} permissions
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`${endpoint}/employee/promotion`, {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: JSON.stringify({
              organization: org_id,
              employee: employee.id,
              roles: rolesChecked,
            }),
          })
            .catch((err) => {
              console.log(err);
            })
            .then((res) => res.json())
            .then((data) => {
              if (data.id === 204) {
                alert("Employee promotion successful!");
                showEmployeeEditBox(null);
              }
            });
        }}
      >
        {list_roles.map((role, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                name={role}
                value={role}
                checked={rolesChecked.includes(role)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setRolesChecked([...rolesChecked, e.target.value]);
                  } else {
                    setRolesChecked(
                      rolesChecked.filter(
                        (checkedRole) => checkedRole !== e.target.value
                      )
                    );
                  }
                }}
              />
              <label htmlFor={role}>{role}</label>
            </div>
          );
        })}
        <div className="flex flex-row justify-evenly my-4">
          <button type="submit" className="btn-style rounded-md shadow-md">
            Submit
          </button>
          <button
            className="btn-style rounded-md shadow-md"
            onClick={() => {
              showEmployeeEditBox(null);
            }}
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};
export default editEmployeeBox;