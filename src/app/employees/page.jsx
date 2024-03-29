"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import "@/styles/globals.css";
import PaginateEmployees from "../../components/PaginateEmployees.jsx";
import EditEmployeeBox from "../../components/EditEmployeeBox.jsx";
import { useRouter } from "next/navigation";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const app_url = process.env.NEXT_PUBLIC_APP_URL;

export default function Employee() {
  const router = useRouter();
  var currUser = null;
  const [employeeEDit, setEmployeeEdit] = useState(false);
  const [employees, setEmployees] = useState([]);
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
      fetch(endpoint + "/employee/seeall", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({ id: currUser.organization.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setEmployees(data);
        });
    }
    if (!loggedIn) {
      redirect("/api/auth/login");
    }
  }, [loggedIn, error, employeeEDit, currUser]);

  const pageSize = 10;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const onEmployeeEdit = (employee) => {
    setEmployeeEdit(employee);
  };
  if (!loggedIn || !employees || router.isFallback) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      {employeeEDit && (
        <EditEmployeeBox
          employee={employeeEDit}
          showEmployeeEditBox={onEmployeeEdit}
        />
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
