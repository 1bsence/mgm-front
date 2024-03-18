"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import "@/styles/globals.css";
import editIcon from "@/public/icons/edit_square_FILL0.svg";
// import EditProjectBox from "@/components/EditProjectBox";

const localEndpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const productionEndpoint = process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;
const localAppUrl = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const productionAppUrl = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? localEndpoint : productionEndpoint;
const appUrl =
  process.env.NODE_ENV === "development" ? localAppUrl : productionAppUrl;

export default function Project() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showProjectEdit, setShowProjectEdit] = useState(false);
  const [project, setProject] = useState(null);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("userData") || null;
      return data;
    }
    return null;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      const getProjectsList = async () => {
        const formData = {
          organization: { id: JSON.parse(loggedIn).organization.id },
          project: { id: pathname.split("/")[2] },
        };
        try {
          const response = await fetch(`${endpoint}/project/read`, {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          setProject(data);
        } catch (error) {
          setError(error);
        }
      };
      getProjectsList();
    } else {
      redirect("/api/auth/login");
    }
  }, [loggedIn]);

  const toggleShowProjectEdit = () => {
    setShowProjectEdit(!showDepEdit);
  };
  if (router.isFallback || !loggedIn || !project) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div>
        {(project?.project?.manager === " " ||
          project?.project?.manager === null ||
          project?.project?.manager?.lenght < 2) && <>Project MAN LIST</>}

        <div className="py-5">
          {project && (
            <div className="flex flex-col justify-evenly items-center">
              {searchParams.get("name") && <h1>{searchParams.get("name")}</h1>}
              {project?.project?.manager.lenght > 1 && (
                <h1>
                  Manager:{" "}
                  {project?.project?.manager?.name ||
                    project?.project?.manager?.id ||
                    "No Manager"}
                </h1>
              )}
            </div>
          )}
          <div className="flex flex-row justify-between bg-bgforeground px-4 rounded-sm shadow-md">
            <h1>EMPLOYEES:</h1>
            <button
              type="button"
              onClick={() => {
                // setShowProjectEdit
                // (true);
              }}
            >
              <div className="flex flex-row justify-center">
                <h1 className="mx-2 hidden sm:block">Edit </h1>
                <Image src={editIcon} alt="add employee" width={20} />
              </div>
            </button>
            {/* {showProjectEdit && (
              <EditProjectBox
                showEditProject={toggleShowProjectEdit}
                Project={project}
              />
            )} */}
          </div>
        </div>
        {/* <EmployeeLIst className="bg-bgforeground w-40 h-20" /> */}
      </div>
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
