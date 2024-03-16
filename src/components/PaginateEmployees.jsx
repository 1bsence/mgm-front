"use client";

import Image from "next/image";
import proilePic from "@/public/logo-black-removebg-preview.png";
import boxEditIcon from "@/public/icons/edit_square_FILL0.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
const PaginateEmployees = ({
  items,
  currentPage,
  pageSize,
  onPageChange,
  seeChangingEmployee,
}) => {
  const pagesCount = Math.ceil(items.length / pageSize);
  return (
    <div>
      <div className="overflow-auto sm:min-h-[32rem]">
        <ul>
          {items
            .slice((currentPage - 1) * pageSize, pageSize * currentPage)
            .map((employee, index) => {
              return (
                <li key={index} className="mx-2 my-3">
                  <div className="flex flex-row items-center justify-between rounded-md shadow-sm shadow-glow-type1 px-2 min-h-20 bg-bgforeground hover:bg-bgbackground hover:border-glow-type1 hover:border-[0.5px]">
                    <div className="flex flex-row">
                      <Image
                        src={proilePic}
                        priority
                        alt="employee"
                        width={50}
                        height={50}
                      />
                      <div className="felx felx-col items-center justify-start mx-2">
                        <h3 className="text-base">{employee.name}</h3>
                        <h3 className="text-sm text-opacity-60">
                          {employee.email}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          seeChangingEmployee(employee);
                        }}
                      >
                        <Image src={boxEditIcon} alt="edit button" width={20} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {pagesCount > 1 && (
        <div
          className={"flex flex-row justify-center bg-glow-type3 items-center"}
        >
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
              if (currentPage <= pagesCount && currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            <h1>-</h1>
          </button>
          <div className="mx-2">
            <h1>{currentPage}</h1>
          </div>
          <button
            className="mx-4 btn-style rounded-md"
            onClick={() => {
              if (currentPage < pagesCount && currentPage >= 1) {
                onPageChange(currentPage + 1);
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
      )}
    </div>
  );
};
export default PaginateEmployees;
