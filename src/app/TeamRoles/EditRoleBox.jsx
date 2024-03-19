import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import Image from "next/image";
import "@/styles/globals.css";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

const EditRoleBox = ({ showEditRole, role }) => {
  const pathParams = useSearchParams();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("userData")) || null;
    }
  });

  const org_id = loggedIn?.organization?.id;

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);

  if (router.isFallback || !loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="fixed top-40 left-1/3 md:left-1/2 w-80 h-44 py-2 px-4 bg-bgbackground rounded-lg shadow-2xl shadow-glow-type1 border-[0.5px] border-glow-type2 overflow-auto">
        <h1 className="flex flex-row justify-center my-1">
          Edit Custom Role: {pathParams.get("name")}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              organization: org_id,
              role: role,
              newrole: e.target.name.value,
              action: "modify",
            };
            fetch(`${endpoint}/customrole`, {
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
                  alert("Role Modified successfuly!");
                  showEditRole(false);
                  redirect("/TeamRoles");
                }
              });
          }}
        >
          <input
            className="bg-bgforeground text-text-darken"
            type="text"
            name="name"
            defaultValue={role}
          />
          <h1 className="my-2">Edit/Delete Role:</h1>

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
                showEditRole(false);
              }}
            >
              Discard
            </button>
            <button
              type="button"
              className="btn-style rounded-md shadow-md hover:bg-glow-type3 hover:border-glow-type3 hover:shadow-glow-type3"
              onClick={(e) => {
                e.preventDefault();
                const formData = {
                  organization: org_id,
                  role: role,
                  action: "delete",
                };
                fetch(`${endpoint}/customrole`, {
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
                      alert("Role Deleted successful!");
                      redirect("/TeamRoles");
                    }
                  });
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default EditRoleBox;
