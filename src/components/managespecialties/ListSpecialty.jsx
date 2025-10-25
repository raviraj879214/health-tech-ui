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
import { toast } from "react-toastify";
import Badge from "../ui/badge/Badge";

export function ListOfSpecialties({ trigger, sendData }) {
  const [specialties, setSpecialties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [message, setMessage] = useState("");

  // Fetch specialties
  const fetchSpecialties = async (page) => {
    try {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/specialties/get-all?page=${page}&limit=${itemsPerPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      setSpecialties(data.data || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch specialties:", error);
    }
  };

  useEffect(() => {
    fetchSpecialties(currentPage);
  }, [currentPage, trigger]);

  // Select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = specialties.map((s) => s.id);
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

  // Delete specialty
  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this specialty?");
    if (!confirmDelete) return;

    const resToken = await fetch("/api/auth/get-token");
    const { token } = await resToken.json();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/specialties/delete-specialties/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.ok) {
        const result = await res.json();
        
        toast.success(result.message, {
                                position: "bottom-right",
                                autoClose: 3000,
                            });

        setTimeout(() => setMessage(""), 3000);
        sendData("", "", "", "", "");
        fetchSpecialties(currentPage);
        
      }
    } catch (error) {
     
      
      toast.error(error.message, {
                                position: "bottom-right",
                                autoClose: 3000,
                            });
    }
  };

  const onEdit = (data) => {
    sendData(data.id, data.name, data.description, data.typeId, data.uuid);
  };

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
                    checked={
                      specialties.length > 0 &&
                      specialties.every((s) => selectedRows.includes(s.id))
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Type
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
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
              {specialties.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(s.id)}
                      onChange={() => handleSelectRow(s.id)}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {s.name || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {s.description || "—"}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {s.type?.name || "—"}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                  
                    <Badge
                      size="sm"
                      color={
                        s.status === 1
                          ? "warning"
                          : s.status === 2
                          ? "success"
                          : "error"
                      }
                    >
                      {s.status === 1
                        ? "Pending"
                        : s.status === 2
                        ? "Approved"
                        : "Rejected"}
                    </Badge>

                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <button onClick={() => onEdit(s)}>
                        <PencilIcon />
                      </button>
                      /
                      <button onClick={() => onDelete(s.id)}>
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
