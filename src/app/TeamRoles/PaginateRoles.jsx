"use client";

import Image from "next/image";
import boxEditIcon from "@/public/icons/edit_square_FILL0.svg";
const PaginateRoles = ({
  items,
  currentPage,
  pageSize,
  onPageChange,
  seeRoleEitBox,
}) => {
  const pagesCount = Math.ceil(items.length / pageSize);
  return (
    <div>
      <div className="overflow-auto sm:min-h-[32rem] ">
        <ul className="felx flex-wrap">
          {items
            .slice((currentPage - 1) * pageSize, pageSize * currentPage)
            .map((role, index) => {
              return (
                <li key={index} className="mx-2 my-3">
                  <div className="flex felx-row items-center justify-between rounded-md shadow-sm shadow-glow-type1 px-4 min-h-20  bg-bgforeground hover:bg-bgbackground hover:border-glow-type1 hover:border-[0.5px]">
                    <div className="flex flex-row">
                      <div className="felx felx-col items-center justify-start mx-2">
                        <h3 className="text-lg">{role}</h3>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          seeRoleEitBox(role);
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
        <div className={"flex flex-row justify-center items-center"}>
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
export default PaginateRoles;
