"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import profile from "@/public/logo-black-removebg-preview.png";
import Link from "next/link";
import "@/styles/globals.css";
const PaginateDepartment = ({
  items,
  currentdeppage,
  pagesize,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(items.length / pagesize);
  return (
    <div>
      <div className="w-full w-min:20 h-full flex flex-wrap">
        {items
          .slice((currentdeppage - 1) * pagesize, pagesize * currentdeppage)
          .map((dep, key) => {
            return (
              <div
                name="department-card"
                key={key}
                className="w-52 h-80 rounded-md shadow-lg m-2 p-2 overflow-auto"
              >
                <div
                  name="DEPARTAMENT NAME"
                  className="flex flex-row justify-between"
                >
                  <h1 className="text-lg text-center">{dep.name}</h1>
                  <Link href={"/department/" + dep.id} className="underline">
                    view
                  </Link>
                </div>
                <hr className="h-1 shadow-md bg-chill-accent" />
                <div
                  name="DEPARTAMENT MANAGER"
                  className="flex flex-col items-center justify-center"
                >
                  <Image src={profile} alt="profile" width={50} />
                  <h5>{dep.manager.name}</h5>
                </div>
                <hr className="h-1 shadow-md bg-chill-accent m-2" />
                <div
                  name="EMPLOYEE LIST"
                  className="grid grid-cols-3 grid-flow-row"
                >
                  {dep.employees.map((emp, key) => {
                    return (
                      <div
                        key={key}
                        className="flex flex-col items-center justify-center shadow-md rounded-md m-2 w-10"
                      >
                        <Image
                          className=""
                          src={profile}
                          alt="profile"
                          width={30}
                        />
                        <h5>{emp.name}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          className="btn-style rounded-md"
          onClick={() => {
            onPageChange(1);
          }}
        >
          <h1>{"<<"}</h1>
        </button>
        <button
          className="mx-4 btn-style rounded-md"
          onClick={() => {
            if (currentdeppage <= pagesCount && currentdeppage > 1) {
              onPageChange(currentdeppage - 1);
              setPage(currentdeppage - 1);
            }
          }}
        >
          <h1>-</h1>
        </button>
        <div className="mx-2">
          <h1>{currentdeppage}</h1>
        </div>
        <button
          className="mx-4 btn-style rounded-md"
          onClick={() => {
            if (currentdeppage < pagesCount && currentdeppage >= 1) {
              onPageChange(currentdeppage + 1);
              setPage(currentdeppage + 1);
            }
          }}
        >
          <h1>+</h1>
        </button>
        <button
          className="btn-style rounded-md"
          onClick={() => {
            onPageChange(pagesCount);
          }}
        >
          <h1>{">>"}</h1>
        </button>
      </div>
    </div>
  );
};
export default PaginateDepartment;
