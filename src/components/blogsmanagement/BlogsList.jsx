


"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PencilIcon, TrashBinIcon } from "../../icons/index";

export function ListOfBlogs({ trigger , sendData }) {
  const [users, setUsers] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [message, setMessage] = useState("");

  // Fetch users
  const fetchUsers = async (page) => {
    try {
         const resToken = await fetch("/api/auth/get-token");
            const { token } = await resToken.json();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/blog/get-blogs?page=${page}&limit=${itemsPerPage}`,{
            method : "GET",
             headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      setUsers(data.data || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, trigger]);

  // Select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = users.map((u) => u.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  // Select row
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Pagination
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Edit (placeholder)
  const edit = (id, name) => {
    console.log("Edit user:", id, name);
  };

  // Delete
  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this blog?");
    if (!confirmDelete) return;

    const resToken = await fetch("/api/auth/get-token");
            const { token } = await resToken.json();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/blog/delete-blog/${id}`,
        { method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
         }
      );

      if (res.ok) {
        const result = await res.json();
       
        setMessage(result.message);
        setTimeout(() => setMessage(""), 3000);

        sendData("","","","","");

        fetchUsers(currentPage);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };


  const onEdit =(data)=>{
   
    sendData(data.id,data.title,data.content,data.tagId,data.image_url);

  }












  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <p className="text-green-600 text-sm p-5">{message}</p>
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  <input
                    type="checkbox"
                    checked={users.length > 0 && users.every((u) => selectedRows.includes(u.id))}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Content
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Image
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tag
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
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.id)}
                      onChange={() => handleSelectRow(user.id)}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {user.title || user.title
                        ? `${user.title || ""} `
                        : "—"}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {user.content}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    
                    <img  src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/blogs/${user.image_url}`}  alt="Profer Logo" style={{ height: "50px" }} />

                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {user.tagId || "No Tag"}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {/* <button onClick={() => edit(user.id, user.firstname)}>
                        <PencilIcon />
                      </button> */}
                       <button onClick={() => onEdit(user)}>
                        <PencilIcon />
                      </button>
                      /
                      <button onClick={() => onDelete(user.id)}>
                        <TrashBinIcon />
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
