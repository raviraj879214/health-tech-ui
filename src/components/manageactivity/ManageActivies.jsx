"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TrashBinIcon, ChevronDownIcon, ChevronUpIcon } from "../../icons/index";
import {AdminActivity} from "../manageactivity/AdminActivities";

export function ManageActivity({ trigger, sendDelete }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [message, setMessage] = useState("");
     const [restriction, setRestriction] = useState(false);

  // Fetch users
  const fetchUsers = async (page) => {
    try {
      const resToken = await fetch("/api/auth/get-token");
      const token = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/admin-activity?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      if (res.status === 403) {
                setRestriction(true);
            }
      const data = await res.json();
      setUsers(data.users || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, trigger]);

  const toggleExpandRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        const result = await res.json();
        sendDelete(true);
        setMessage(result.message);
        setTimeout(() => setMessage(""), 3000);
        fetchUsers(currentPage);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

      if (restriction) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">
            Access Denied
          </h2>
          <p className="mt-2 text-gray-500">
            You do not have permission to view this content.
          </p>
          
        </div>
      </div>
      </>
    );
  }

  
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <p className="text-green-600 text-sm p-5">{message}</p>
        <div className="min-w-[600px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  Admin Users
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  {/* Row Content */}
                  <TableRow>
                    <TableCell colSpan={1} className="px-5 py-4 text-start">
                      <div className="flex justify-between items-center w-full">
                        <div>
                          {user.firstname || user.lastname
                            ? `${user.firstname || ""} ${user.lastname || ""}`
                            : "—"}{" "}
                          ({user.role?.name || "No Role"}) — {user.email} — {user.Bio || "No bio"}
                        </div>
                        <div className="flex gap-2 items-center">
                          <button onClick={() => toggleExpandRow(user.id)}>
                            {expandedRows.includes(user.id) ? (
                              <ChevronUpIcon className="w-4 h-4" />
                            ) : (
                              <ChevronDownIcon className="w-4 h-4" />
                            )}
                          </button>
                         
                        </div>
                      </div>

                      {/* Expanded Content: only render when clicked */}
                      {expandedRows.includes(user.id) && (
                        <div className="p-5 mt-3 bg-gray-50 dark:bg-white/[0.05] rounded">

                              <AdminActivity userId ={user.id} />

                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-gray-100 dark:border-white/[0.05]">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-500 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
