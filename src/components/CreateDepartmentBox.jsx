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

const CreateDepartmentBox = ({ showCreateDepartment }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("userData")) || null;
    }
  });

  const org_id = loggedIn.organization.id;

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);

  return (
    <div>
      <div className="fixed top-40 left-1/3 md:left-1/2 w-80 h-52 py-2 px-4 bg-bgbackground rounded-lg shadow-2xl shadow-glow-type1 border-[0.5px] border-glow-type2">
        <div>
          <h1 className="flex flex-row justify-center my-1">
            Create Department
          </h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target.elements.name.value);
            const formData = {
              organization: {
                id: org_id,
              },
              department: {
                name: e.target.elements.name.value,
              },
            };
            console.log(formData);
            fetch(`${endpoint}/department/create`, {
              method: "POST",
              headers: {
                accept: "application/json",
              },
              body: JSON.stringify(formData),
            })
              .catch((err) => {
                console.log(err);
              })
              .then((res) => {
                if (res.ok) {
                  alert("Department Created successful!");
                  showCreateDepartment(null);
                }
              });
          }}
        >
          <label htmlFor="name" className="text-xs">
            Input the name without spaces
          </label>
          <input
            className="input-field-style w-full h-10 my-2 border-glow-type1 border-[0.5px]"
            required={true}
            type="text"
            name="name"
            id="name"
            placeholder="Department Name"
          />
          <div className="flex flex-row justify-evenly my-4">
            <button
              type="submit"
              className="btn-style rounded-md shadow-md hover:bg-glow-type1 hover:border-glow-type1 hover:shadow-glow-type1"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn-style rounded-md shadow-md hover:bg-glow-type3 hover:border-glow-type3 hover:shadow-glow-type3"
              onClick={() => {
                showCreateDepartment(null);
              }}
            >
              Discard
            </button>
          </div>
        </form>
      </div>
      <div />
    </div>
  );
};
export default CreateDepartmentBox;
