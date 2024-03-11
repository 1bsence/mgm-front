"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import "@/styles/globals.css";
import PaginateEmployees from "@/components/PaginateEmployees";
import EditEmployeeBox from "@/components/EditEmployeeBox";

const local_endpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const production_endpoint = process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? local_endpoint : production_endpoint;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;

export default function Employee() {
  const [employeeEDit, setEmployeeEdit] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userData") || null;
    }
  });
  var orgid = loggedIn ? JSON.parse(loggedIn).organization.id : null;
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(endpoint + "/employee/seeall", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify({ id: orgid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
      });
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error, employeeEDit]);

  const pageSize = 10;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const onEmployeeEdit = (employee) => {
    setEmployeeEdit(employee);
  };
  return (
    <div>
      {employeeEDit && (
        <div className="fixed top-40 left-1/3 md:left-1/2 w-80 h-52 bg-primary  border-colorful-accent border-opacity-65 border-2 rounded-md">
          <EditEmployeeBox
            employee={employeeEDit}
            showEmployeeEditBox={onEmployeeEdit}
          />
        </div>
      )}
      <PaginateEmployees
        items={employees}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        seeChangingEmployee={onEmployeeEdit}
      />
    </div>
  );
}
