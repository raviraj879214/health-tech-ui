"use client"
import { useState, useEffect } from "react";




export function RoleDropdown({sendRoleID}) {


  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  // Fetch roles from API
  const fetchRoles = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/roles`);
      if (res.ok) {
        const data = await res.json();
        // Make sure to check if roles exist
        setRoles(data.roles || []);
      } else {
        console.error("Failed to fetch roles");
      }
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
    sendRoleID(e.target.value);
  };

  return (
    <div className="col-span-6 sm:col-span-6 space-y-5 sm:space-y-6">
      <label htmlFor="role" className="block mb-2 font-medium">
        Select Role:
      </label>
      <select
        id="role"
        value={selectedRole}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">-- Choose a role --</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
     
    </div>
  );
}
