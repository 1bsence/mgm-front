"use client";
import {usePathname,useSearchParams} from "next/navigation"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import profile from "@/public/logo-black-removebg-preview.png";
import Link from "next/link";
import "@/styles/globals.css";
import boxEditIcon from "@/public/icons/edit_square_FILL0.svg";


const PaginateProject = ({
  items,
  currentPage,
  pageSize,
  onPageChange,
  showCreateProject,
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
  const pagesCount = Math.ceil(items.length / pageSize);
  return (
    <div>
      <div className="flex flex-row justify-evenly">
        <button
          onClick={() => {
            showCreateProject(true);
          }}
        >
          Create New
        </button>
      </div>
      <div className="w-full w-min:20 h-full flex flex-wrap">
        <ul className="min-w-full">
          {items
            .slice((currentPage - 1) * pageSize, pageSize * currentPage)
            .map((prj, index) => {
              return (
                <li key={index} className="mx-2 my-3 min-w-96">
                  <div className="flex flex-row items-center justify-between rounded-md shadow-sm shadow-glow-type1 px-2 min-h-20  bg-bgforeground hover:bg-bgbackground hover:border-glow-type1 hover:border-[0.5px]">
                    <div className="felx felx-row items-center justify-evenly mx-2">
                      <div>
                        <h3 className="text-base">{prj.name}</h3>
                      </div>
                      <div>
                        <h3 className="text-sm text-opacity-60">
                          {prj.employees.length} Employees
                        </h3>
                      </div>
                    </div>
                    <div>
                      <Link href={`/project/${prj.id}?name=${prj.name}`}>Details...</Link>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {pagesCount > 1 && (
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
export default PaginateProject;
