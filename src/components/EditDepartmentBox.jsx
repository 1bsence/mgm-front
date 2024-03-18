import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import Image from "next/image";
import "@/styles/globals.css";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

const EditDepartmentBox = ({ showEditDepartment, department }) => {
  const [showAlert, setshowAlert] = useState(false);
  const pathParams = useSearchParams();
  const [rolesChecked, setRolesChecked] = useState([]);
  const router = useRouter();
  const [employeeList, setEmployeeList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("userData")) || null;
    }
  });

  const org_id = loggedIn?.organization?.id;

  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          endpoint + "/employee/searchbydepartment",
          {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: JSON.stringify({
              organization: org_id,
              department: "any",
            }),
          }
        );
        const data = await response.json();
        setEmployeeList(data);
        setRolesChecked(
          data.map((emp) => department.employees.includes(emp.id))
        );
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }

    fetchData();

    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error]);

  if (router.isFallback || !loggedIn || !employeeList) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="fixed top-40 left-1/3 md:left-1/2 w-80 h-72 py-2 px-4 bg-bgbackground rounded-lg shadow-2xl shadow-glow-type1 border-[0.5px] border-glow-type2 overflow-auto">
        <h1 className="flex flex-row justify-center my-1">
          Edit {pathParams.get("name")} Department
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(rolesChecked.length > 0 ? rolesChecked : []);
            const formData = {
              organization: { id: org_id },
              department: {
                id: department.id,
                name: e.target.elements.name.value,
                manager: department.manager?.id || " ",
                skills: [],
                employees: rolesChecked.length > 0 ? rolesChecked : [],
              },
            };
            fetch(`${endpoint}/department/modify`, {
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
                  alert("Department Modified successful!");
                  showEditDepartment(null);
                  redirect("/department");
                }
              });
          }}
        >
          <input
            className="bg-bgforeground text-text-darken"
            type="text"
            name="name"
            defaultValue={pathParams.get("name")}
          />
          <h1 className="my-2">Add/Remove employees:</h1>
          {(!rolesChecked || !employeeList) && <div>Loading....</div>}
          {employeeList?.map((emp, key) => {
            return (
              <div key={key}>
                <input
                  className="accent-button-normal hover:accent-glow-type2 text-text-darken"
                  type="checkbox"
                  value={emp.id}
                  checked={rolesChecked.includes(emp.id)}
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
                <label className="mx-2" htmlFor={emp.name}>
                  {emp.name}
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
              type="button"
              className="btn-style rounded-md shadow-md hover:bg-glow-type3 hover:border-glow-type3 hover:shadow-glow-type3"
              onClick={() => {
                showEditDepartment(null);
              }}
            >
              Discard
            </button>
            <button
              type="button"
              className="btn-style rounded-md shadow-md hover:bg-glow-type3 hover:border-glow-type3 hover:shadow-glow-type3"
              onClick={() => {
                fetch(`${endpoint}/department/remove`, {
                  method: "POST",
                  headers: {
                    accept: "application/json",
                  },
                  body: JSON.stringify({
                    organization: {
                      id: org_id,
                    },
                    department: {
                      id: department.id,
                    },
                  }),
                })
                  .catch((err) => {
                    console.log(err);
                  })
                  .then((res) => {
                    if (res.ok) {
                      alert("Department Deleted successful!");
                      redirect("/department");
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

export default EditDepartmentBox;
