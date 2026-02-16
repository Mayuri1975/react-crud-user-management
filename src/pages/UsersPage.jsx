import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../api/userService";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ FIXED SUBMIT HANDLER
  const handleSubmit = async (data) => {
  console.log("User Data Received in UsersPage:", data); // 👈 ADD THIS

  try {
    const duplicateUser = users.find(
      (user) =>
        user.email === data.email &&
        (!editingUser || user.id !== editingUser.id)
    );

    if (duplicateUser) {
      alert("User with this email already exists!");
      return;
    }

    if (editingUser) {
      await updateUser(editingUser.id, data);
      setEditingUser(null);
    } else {
      await createUser(data);
    }

    await fetchUsers();
  } catch (error) {
    console.error("Error saving user:", error);
  }
};


  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
  <Box
    sx={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      py: 6,
      px: { xs: 2, md: 6 }
    }}
  >
    <Box sx={{ width: "100%", maxWidth: "1200px" }}>
      
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          textAlign: "center",
          color: "white",
          mb: 5,
        }}
      >
        User Management System
      </Typography>

      <Paper elevation={8} sx={{ p: 4, mb: 5, borderRadius: 4 }}>
        <UserForm
          onSubmit={handleSubmit}
          initialData={editingUser}
        />
      </Paper>

      <Paper elevation={8} sx={{ p: 3, borderRadius: 4 }}>
        <UserList
          users={users}
          onEdit={setEditingUser}
          onDelete={handleDelete}
        />
      </Paper>

    </Box>
  </Box>
);

};

export default UsersPage;

