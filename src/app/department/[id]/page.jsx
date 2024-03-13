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
  const [depManagersList, setDepManagersList] = useState();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [department, setDepartment] = useState();
  // const [hasPermission, SetHasPermission] = useState(false);
  const [error, setError] = useState(null);
  const [currUser, setCurrUser] = useState();
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
          setDepartment(data);
        });
      fetch(endpoint + "/employee/searchbydepartment", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({
          organization: JSON.parse(loggedIn).organization.id,
          department: searchParams.get("name"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setEmployees(data);
        });
    }

    if (!loggedIn) {
      redirect("/api/auth/login");
    } else {
      setCurrUser(JSON.parse(loggedIn));
    }
  }, [loggedIn, error]);

  var hasPermission = false;
  if (currUser) {
    if (
      !(
        currUser.employee.roles?.includes("Administrator") ||
        currUser.employee.roles?.includes("Department Manager")
      )
    ) {
      console.log("You do not have permission to view this page");
      console.log(currUser);
      redirect("/");
    } else {
      console.log("You have permission to view this page");
      console.log(currUser);
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
      <div>
        ADD MANAGER!!
        {department.manager && <DepManagersList employees={employees} />}
      </div>

      // <div className="py-5">
      //   {department && (
      //     <div className="flex flex-col justify-evenly items-center">
      //       {department?.name}
      //       {department.manager && (
      //         <h1>
      //           Manager: {department?.manager?.name || department?.manager?.id}
      //         </h1>
      //       )}
      //     </div>
      //   )}
      //   <div className="flex flex-row justify-between bg-foreground px-4 rounded-sm+ shadow-md">
      //     <h1>EMPLOYEES:</h1>
      //     <button type="button">
      //       <div className="flex +flex-row justify-center">
      //         <h1 className="mx-2">Edit </h1>
      //         <Image src={editIcon} alt="add employee" width={20} />
      //       </div>
      //     </button>
      //   </div>
      //   {employees &&
      //     (console.log(employees),
      //     (
      //       <div className="px-2">
      //         <ul>
      //           {employees.map((emp, key) => (
      //             <li key={key} className="mx-2 my-3">
      //               <div className="flex flex-row items-center justify-between rounded-md shadow-sm shadow-glow-type1 px-2 min-h-20 bg-foreground hover:bg-background hover:border-glow-type1 hover:border-[0.5px]">
      //                 <div className="flex flex-row">
      //                   <Image
      //                     src={profileImg}
      //                     priority
      //                     alt="employee"
      //                     width={50}
      //                     height={50}
      //                   />
      //                   <div className="felx felx-col items-center justify-start mx-2">
      //                     <h3 className="text-base">{emp.name}</h3>
      //                     {emp?.skills.lenght > 0 && (
      //                       <h3 className="text-sm text-opacity-60">
      //                         {emp?.skills?.map((skill) => skill.name)}
      //                       </h3>
      //                     )}
      //                   </div>
      //                 </div>
      //                 <div></div>
      //               </div>
      //             </li>
      //           ))}
      //         </ul>
      //       </div>
      //     ))}
      // </div>
    );
  }
}
const DepManagersList = (employees) => {
  const managers = [];
  console.log(employees.employees);
  employees.employees.map((emp) => {
    if (emp.roles.includes("Department Manager")) {
      managers.push(emp);
    }
  });
  return (
    <div>
      {managers.length > 0 && (
        <div className="flex flex-row items-center justify-center">
          <h1 className="px-2">Select Manager:</h1>
          <select
            onSubmit={() => {
              console.log("submitting");++
            }}
            className="bg-foreground hover:bg-background hover:border-glow-type1 hover:border-[0.5px] rounded-md"
          >
            {managers.map((manager, index) => (
              <option key={index} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
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