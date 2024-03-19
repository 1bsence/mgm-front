"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import "@/styles/globals.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import profileImg from "@/public/logo-black-removebg-preview.png";
import editIcon from "@/public/icons/edit_square_FILL0.svg";
import EditDepartmentBox from "@/components/EditDepartmentBox";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

export default function Page() {
  const url_params = useSearchParams();
  const [depEmployeeList, setDepEmployeeList] = useState([]);
  const [showDepEdit, setShowDepEedit] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [department, setDepartment] = useState();
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });

  const [employees, setEmployees] = useState();
  const router = useRouter();
  useEffect(() => {
    if (loggedIn) {
      fetch(endpoint + "/department/read", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({
          organization: {
            id: JSON.parse(loggedIn).organization.id,
          },
          department: {
            id: pathname.split("/")[2],
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "department data");
          setDepartment(data);
        });
    }
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn]);

  const toggleShowDepEdit = () => {
    setShowDepEedit(!showDepEdit);
  };
  if (loggedIn) {
    if (
      !(
        JSON.parse(loggedIn).employee.roles?.includes("Administrator") ||
        JSON.parse(loggedIn).employee.roles?.includes("Department Manager")
      )
    ) {
      console.log("You do not have permission to view this page");
      hasPermission = false;
      redirect("/");
    } else {
      console.log("You have permission to view this page");
    }
  }
  if (router.isFallback || !loggedIn || !department) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      console.log(department),
      (
        <div>
          {(department?.manager === " " ||
            department?.manager === null ||
            department?.manager?.lenght < 2) && <DepManagersList />}

          <div className="py-5">
            {department && (
              <div className="flex flex-col justify-evenly items-center">
                {searchParams.get("name") && (
                  <h1>{searchParams.get("name")}</h1>
                )}
                {department.manager.lenght > 1 && (
                  <h1>
                    Manager:{" "}
                    {department?.manager?.name || department?.manager?.id}
                  </h1>
                )}
              </div>
            )}
            <div className="flex flex-row justify-between bg-bgforeground px-4 rounded-sm shadow-md">
              <h1>EMPLOYEES:</h1>
              <button
                type="button"
                onClick={() => {
                  setShowDepEedit(true);
                }}
              >
                <div className="flex flex-row justify-center">
                  <h1 className="mx-2 hidden sm:block">Edit </h1>
                  <Image src={editIcon} alt="add employee" width={20} />
                </div>
              </button>
              {showDepEdit && (
                <EditDepartmentBox
                  showEditDepartment={toggleShowDepEdit}
                  department={department}
                />
              )}
            </div>
          </div>
          <EmployeeLIst className="bg-bgforeground w-40 h-20" />
        </div>
      )
    );
  }
}
const EmployeeLIst = () => {
  const [depEmployeeList, setDepEmployeeList] = useState([]);
  const url_params = useSearchParams();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  const formData = {
    organization: JSON.parse(loggedIn).organization.id,
    department: url_params.get("name"),
  };
  useEffect(() => {
    const getEmp = () => {
      fetch(endpoint + "/employee/searchbydepartment", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setDepEmployeeList(data);
        });
    };
    getEmp();
  }, []);

  console.log(depEmployeeList, "from employee list");
  return (
    <div>
      {depEmployeeList.map((emp, index) => {
        return (
          <div key={index}>
            <h1>{emp.name}</h1>
          </div>
        );
      })}
    </div>
  );
};
const DepManagersList = (department) => {
  const [depEmployeeList, setDepEmployeeList] = useState([]);
  const url_params = useSearchParams();
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  const formData = {
    organization: JSON.parse(loggedIn).organization.id,
    department: url_params.get("name"),
  };
  useEffect(() => {
    const getEmp = () => {
      fetch(endpoint + "/employee/searchbydepartment", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setDepEmployeeList(data);
        });
    };
    getEmp();
    console.log(depEmployeeList, "from employee list");
  }, []);
  const managers = [];
  depEmployeeList.map((emp) => {
    if (emp.roles.includes("Department Manager")) {
      managers.push(emp);
    }
  });
  return (
    <div>
      {managers.map((manager, index) => {
        return (
          <li key={index} className="mx-2 my-3 min-w-96">
            <div className="flex flex-row items-center justify-between rounded-md shadow-sm shadow-glow-type1 px-2 min-h-20  bg-foreground hover:bg-background hover:border-glow-type1 hover:border-[0.5px]">
              <div className="felx felx-row items-center justify-evenly mx-2">
                <h3 className="text-base">{manager.name}</h3>
              </div>
            </div>
          </li>
        );
      })}
      {managers.length > 0 && (
        <div className="flex flex-row items-center justify-center">
          <h1 className="px-2">Select Manager:</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log({ id: e.target.vallue[0], name: e.target.value[1] });
              console.log("submitting");
              const formData = {
                organization: {
                  id: JSON.parse(loggedIn).organization.id,
                },
                department: {
                  id: department.id,
                  name: department.name,
                  manager: { id: e.target.vallue[0], name: e.target.value[1] },
                  skills: department.skills,
                  employees: department.employees,
                },
              };
              fetch(endpoint + "/department/modify", {
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
                    alert("Department Edited successful!");
                  }
                });
            }}
          >
            <select className="bg-foreground hover:bg-background hover:border-glow-type1 hover:border-[0.5px] rounded-md">
              {managers.map((manager, index) => (
                <option key={index} value={[manager.id, manager.name]}>
                  {manager.name}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {managers.length < 1 && (
        <div className="flex flex-col items-center justify-center">
          <h1>No Managers Found</h1>
          <p>Try appointing a employee to department manager first?</p>
        </div>
      )}
    </div>
  );
};