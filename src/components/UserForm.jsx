import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Divider,
  Stack
} from "@mui/material";
import { userFields } from "../config/userFields";

const UserForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  let newErrors = {};

  userFields.forEach((field) => {
    const value = formData[field.name] || "";

    if (field.required && !value) {
      newErrors[field.name] = "This field is required";
    }

    if (field.pattern && !field.pattern.test(value)) {
      newErrors[field.name] = field.errorMessage;
    }
  });

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    onSubmit(formData);
  }
};




  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        p: 4,
        borderRadius: 4
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{
          color: "#4F46E5",
          letterSpacing: 0.5
        }}
      >
        {initialData ? "Edit User Details" : "Add New User"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Form Fields */}
      <Grid container spacing={3}>
        {userFields.map((field) => (
          <Grid size={{ xs: 12, sm: 6 }} key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type}
              required={field.required}
              value={formData?.[field.name] || ""}
              onChange={handleChange}
              variant="outlined"
              size="medium"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "#ffffff"
                }
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Buttons */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mt: 4 }}
      >
        <Button
          type="submit"
          size="large"
          sx={{
            px: 4,
            borderRadius: 3,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)"
            }
          }}
        >
          {initialData ? "Update User" : "Add User"}
        </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;

