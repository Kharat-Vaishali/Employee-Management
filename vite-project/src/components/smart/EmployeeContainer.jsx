import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  deleteEmployee,
  clearMessages,
} from "../../features/employees/employeeSlice";

import EmployeeTable from "../dumb/EmployeeTable";

import {
  Button,
  TextField,
  Container,
  Stack,
  Snackbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const EmployeeContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: employees = [], error, success } =
    useSelector((state) => state.employees);

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch employees
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {

    const searchValue = search.trim().toLowerCase();

    const id = emp?.id ? emp.id.toString() : "";
    const name = emp?.name ? emp.name.toLowerCase() : "";
    const email = emp?.email ? emp.email.toLowerCase() : "";

    return (
      id.includes(searchValue) ||
      name.includes(searchValue) ||
      email.includes(searchValue)
    );
  });

  // Open dialog
  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    dispatch(deleteEmployee(deleteId));
    setOpenDialog(false);
    setDeleteId(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  return (

    <Container
      sx={{
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: { xs: 2, sm: 3 },
        transition: "all 0.4s ease"
      }}
    >

      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Employee Management
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >

        {/* Add Button */}

        <Button
          variant="contained"
          onClick={() => navigate("/add")}
          sx={{
            minWidth: 150,
            background: "linear-gradient(135deg,#00c6ff,#0072ff)",
            fontWeight: "bold"
          }}
        >
          Add Employee
        </Button>

        {/* Search Bar */}

        <TextField
          placeholder="Search by ID, Name, Email"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            input: {
              color: darkMode ? "#fff" : "#000"
            },

            "& .MuiOutlinedInput-root": {

              "& fieldset": {
                borderColor: darkMode ? "#666" : "#ccc"
              },

              "&:hover fieldset": {
                borderColor: darkMode ? "#aaa" : "#1976d2"
              }

            },

            "& .MuiInputBase-input::placeholder": {
              color: darkMode ? "#bbb" : "#555",
              opacity: 1
            }
          }}
        />

        {/* Dark Mode Button */}

        <Button
          variant="outlined"
          onClick={() => setDarkMode(!darkMode)}
          sx={{ minWidth: 150 }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </Button>

      </Stack>

      {/* Employee Table */}

      <EmployeeTable
        employees={filteredEmployees}
        searchText={search}
        onEdit={(id) => navigate(`/edit/${id}`)}
        onDelete={handleDelete}
      />

      {/* Delete Dialog */}

      <Dialog open={openDialog} onClose={cancelDelete}>

        <DialogTitle>
          Delete Employee
        </DialogTitle>

        <DialogContent>

          <DialogContentText>
            Are you sure you want to delete this employee?
            This action cannot be undone.
          </DialogContentText>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={cancelDelete}
            variant="outlined"
          >
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog>

      {/* Snackbar */}

      <Snackbar
        open={!!success || !!error}
        autoHideDuration={3000}
        message={success || error}
        onClose={() => dispatch(clearMessages())}
      />

    </Container>
  );
};

export default EmployeeContainer;