"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import {PencilIcon ,TrashBinIcon} from "../../icons/index";

import Badge from "../ui/badge/Badge";
import Image from "next/image";



export function RolesList({trigger , sendData ,sendDelete }) {


  const [roles, setRoles] = useState([]); // current page data
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [messagerolelist,setmessagerolelist] = useState("");

  // Fetch roles from backend
  const fetchRoles = async (page) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/roles?page=${page}&limit=${itemsPerPage}`
      );
      const data = await res.json();

      setRoles(data.roles || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles(currentPage);
  }, [currentPage,trigger  ]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = roles.map((item) => item.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
  setCurrentPage((prev) => Math.min(prev + 1, totalPages));



  const edit = async (data1,data2)=>{
    sendData(data1,data2);
  }

const onDelete = async (id) => {
  debugger;
  // Show confirm dialog
  const confirmDelete = window.confirm("Are you sure you want to delete this role?");
  if (!confirmDelete) return; // Exit if user cancels

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/roles/${id}`, {
      method: "DELETE",
    });

   
    debugger;
    if (res.ok) {
      const result = await res.json();
    
      sendDelete(true);

      setmessagerolelist(result.message);
      setTimeout(() => {
        setmessagerolelist("");
      }, 3000);
     
    } else {
      
    }
  } catch (error) {
    
  }
};






  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <p className="text-green-600 text-sm p-5">{messagerolelist}</p>
        <div className="min-w-[1102px]">
         
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  <input
                    type="checkbox"
                    checked={roles.every((row) => selectedRows.includes(row.id))}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  User 
                </TableCell>

                 <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
               
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {roles.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(order.id)}
                      onChange={() => handleSelectRow(order.id)}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-centre">
                    <div className="flex items-center gap-3 ">
                     
                      <div>
                        <span className="block text-start font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.user?.name || order.name}
                        </span>

                        
                      </div>
                    </div>
                  </TableCell>
                 
                  <TableCell className="px-5 py-4 sm:px-6 text-centre">
                    <div className="flex items-center gap-3 ">
                      <button onClick={()=> edit(order.id,order.name)}>
                      <PencilIcon></PencilIcon>
                      </button>
                       <button onClick={()=> onDelete(order.id)}>
                      <TrashBinIcon></TrashBinIcon>
                      </button>

                    </div>
                  </TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-gray-100 dark:border-white/[0.05]">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-500 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
