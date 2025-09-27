"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronDownIcon } from "../../icons"; // Make sure you have this icon

export function ManageActivity() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Items per page

  const mockUsers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    firstname: `User${i + 1}`,
    lastname: `Last${i + 1}`,
    email: `user${i + 1}@example.com`,
    Bio: `Bio of User${i + 1}`,
    role: { name: i % 2 === 0 ? "Admin" : "User" },
  }));

  const totalPages = Math.ceil(mockUsers.length / itemsPerPage);
  const paginatedUsers = mockUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleExpandRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  <input
                    type="checkbox"
                    checked={
                      paginatedUsers.length > 0 &&
                      paginatedUsers.every((u) => selectedRows.includes(u.id))
                    }
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
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Role
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
              {paginatedUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <TableRow>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => handleSelectRow(user.id)}
                      />
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      {`${user.firstname} ${user.lastname}`}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      {user.role?.name || "No Role"}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <button
                        onClick={() => toggleExpandRow(user.id)}
                        className="transform transition-transform duration-200"
                      >
                        <ChevronDownIcon
                          className={`h-5 w-5 ${
                            expandedRows.includes(user.id) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </TableCell>
                  </TableRow>

                  {expandedRows.includes(user.id) && (
                    <TableRow className="bg-gray-50 dark:bg-white/[0.03]">
                      <TableCell colSpan={5} className="px-5 py-4 sm:px-6">
                        <div>
                          <p>
                            <strong>Bio:</strong> {user.Bio || "No bio available"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
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
