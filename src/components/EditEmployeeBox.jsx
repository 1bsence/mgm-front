"use client";
import { useEffect, useState } from "react";
import "@/styles/globals.css";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

const EditEmployeeBox = ({ employee, showEmployeeEditBox }) => {
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
    <div className="fixed top-40 left-1/3 md:left-1/2 w-80 h-52 py-2 px-4 bg-bgbackground rounded-lg shadow-2xl shadow-glow-type1 border-[0.5px] border-glow-type2">
      <h1 className="flex flex-row justify-center my-1">
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
                className="accent-button-normal hover:accent-glow-type2"
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
              <label className="mx-2" htmlFor={role}>
                {role}
              </label>
            </div>
          );
        })}
        <div className="flex flex-row justify-evenly my-4">
          <button
            type="submit"
            className="btn-style rounded-md shadow-md hover:bg-glow-type1 hover:border-glow-type1 hover:shadow-glow-type1"
          >
            Submit
          </button>
          <button
            className="btn-style rounded-md shadow-md hover:bg-glow-type3 hover:border-glow-type3 hover:shadow-glow-type3"
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
export default EditEmployeeBox;
