"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import "@/styles/globals.css";
import PaginateRoles from "./PaginateRoles.jsx";
import CreateRolesBox from "./CreateRolesBox.jsx";

import EditRoleBox from "./EditRoleBox.jsx";
import { useRouter } from "next/navigation";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

export default function Roles() {
  const router = useRouter();
  var currUser = null;
  // const [employeeEDit, setEmployeeEdit] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [showCreateRoles, setShowCreateRoles] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("userData") || null;
      return data;
    }
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    currUser = loggedIn ? JSON.parse(loggedIn) : null;
    if (currUser) {
      const formdata = {
        organization: currUser.organization.id,
        action: "read",
      };
      fetch(endpoint + "/customrole", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(formdata),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log(data, " rolesssssss");
              setRoleList(data);
            });
          }
        })
        .catch((error) => {
          console.log(
            "There was a problem with the fetch operation: " + error.message
          );
        });
    }
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error, currUser]);
  const pageSize = 10;
  const toggleShowCreateRoles = () => {
    setShowCreateRoles(!showCreateRoles);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const showEditRole = (role) => {
    setEditRole(role);
  };
  //   const onEmployeeEdit = (employee) => {
  //     setEmployeeEdit(employee);
  //   };
  if (!loggedIn || !roleList || router.isFallback) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }
  console.log(roleList, "roleList");
  return (
    <div>
      <div className="flex flex-row justify-center my-4">
        <button
          className="w-40 rounded-md btn-style"
          onClick={toggleShowCreateRoles}
        >
          CREATE NEW ROLE
        </button>
        {showCreateRoles && (
          <CreateRolesBox showCreateRoles={toggleShowCreateRoles} />
        )}
      </div>
      <PaginateRoles
        items={roleList}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        seeRoleEitBox={showEditRole}
      />
      {editRole && <EditRoleBox role={editRole} showEditRole={showEditRole} />}
    </div>
  );
}
