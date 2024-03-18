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

const local_endpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const production_endpoint = process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? local_endpoint : production_endpoint;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;

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
            department?.manager?.lenght < 2) && <>DEP MAN LIST</>}

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
