

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

  /* Dark mode from localStorage */

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

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

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {

    dispatch(deleteEmployee(deleteId));

    setOpenDialog(false);
    setDeleteId(null);

  };

  const cancelDelete = () => {

    setOpenDialog(false);
    setDeleteId(null);

  };

  /* Dark Mode Toggle */

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
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

        {/* Add Employee */}

        <Button
          variant="contained"
          onClick={() => navigate("/add", { state: { darkMode } })}
        >
          Add Employee
        </Button>

        {/* Search */}

        <TextField
          placeholder="Search by ID, Name, Email"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            input: {
              color: darkMode ? "#fff" : "#000"
            }
          }}
        />

        {/* Dark Mode Toggle */}

        <Button
          variant="outlined"
          onClick={toggleDarkMode}
        >
          {darkMode ? "☀" : "🌙"}
        </Button>

      </Stack>

      <EmployeeTable
        employees={filteredEmployees}
        searchText={search}
        darkMode={darkMode}
        onEdit={(id) => navigate(`/edit/${id}`, { state: { darkMode } })}
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