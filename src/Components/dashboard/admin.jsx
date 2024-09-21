import React, { useState } from "react";
import "./AdminRoles.css";

const AdminRoles = () => {
  const [admins, setAdmins] = useState([
    {
      name: "John Doe",
      role: "Manager",
      email: "john@example.com",
      permissions: ["View Reports", "Edit Users"],
    },
    {
      name: "Jane Smith",
      role: "Developer",
      email: "jane@example.com",
      permissions: ["View Reports"],
    },
  ]);

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [editPermissionsModal, setEditPermissionsModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const handleAddAdmin = () => {
    if (newAdminEmail) {
      setAdmins([
        ...admins,
        {
          name: "New Admin",
          role: "New Role",
          email: newAdminEmail,
          permissions: [],
        },
      ]);
      setNewAdminEmail("");
      alert("Invitation sent to " + newAdminEmail);
    }
  };

  const handleDeleteAdmin = (email) => {
    setAdmins(admins.filter((admin) => admin.email !== email));
  };

  const handleEditPermissions = (admin) => {
    setCurrentAdmin(admin);
    setEditPermissionsModal(true);
  };

  const handleSavePermissions = (permissions) => {
    setAdmins(
      admins.map((admin) =>
        admin.email === currentAdmin.email ? { ...admin, permissions } : admin
      )
    );
    setEditPermissionsModal(false);
  };

  const availablePermissions = ["View Reports", "Edit Users", "Manage Blogs"];

  return (
    <div className="admin-roles">
      <h2>Admin Roles Management</h2>

      <div className="add-admin">
        <div className="invite-description">
          Invite a new admin by entering their email below.
        </div>
        <div className="add-admin-mail">
          <input
            className="addAdminInput"
            type="email"
            placeholder="Enter an email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
          />
          <button onClick={handleAddAdmin}>Send Invitation</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Role</th>
            <th>Email</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index}>
              <td>{admin.name}</td>
              <td>{admin.role}</td>
              <td>{admin.email}</td>
              <td>{admin.permissions.join(", ")}</td>
              <td>
                <button onClick={() => handleEditPermissions(admin)}>
                  Edit Permissions
                </button>
                <button onClick={() => handleDeleteAdmin(admin.email)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editPermissionsModal && (
        <div className="modal">
          <h3>Edit Permissions for {currentAdmin.name}</h3>
          <form>
            {availablePermissions.map((perm) => (
              <div key={perm}>
                <label>
                  <input
                    type="checkbox"
                    checked={currentAdmin.permissions.includes(perm)}
                    onChange={(e) => {
                      const newPermissions = e.target.checked
                        ? [...currentAdmin.permissions, perm]
                        : currentAdmin.permissions.filter((p) => p !== perm);
                      handleSavePermissions(newPermissions);
                    }}
                  />
                  {perm}
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setEditPermissionsModal(false)}
            >
              Close
            </button>
          </form>
        </div>
      )}

      <div className="permissions">
        <h3>Permissions</h3>
        <ul>
          <li>
            <strong>View Reports:</strong> Allows viewing analytics reports.
          </li>
          <li>
            <strong>Edit Users:</strong> Allows adding, editing, or deleting
            users.
          </li>
          <li>
            <strong>Manage Blogs:</strong> Allows creating, editing, or deleting
            blog posts.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminRoles;
