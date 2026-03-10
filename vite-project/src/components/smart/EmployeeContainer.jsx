

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

        {/* Add Employee Button */}

        <Button
          variant="contained"
          onClick={() => navigate("/add")}
          sx={{
            minWidth: 150,
            fontWeight: "bold",
            borderRadius: 3,
            background: "linear-gradient(135deg,#ff1744,#d50000)",
            boxShadow: "0 6px 15px rgba(255,0,0,0.4)",
            transform: "translateY(0)",
            transition: "all 0.3s ease",

            "&:hover": {
              background: "linear-gradient(135deg,#d50000,#b71c1c)",
              transform: "translateY(-3px)",
              boxShadow: "0 10px 25px rgba(255,0,0,0.5)"
            }
          }}
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
          sx={{
            minWidth: 150,
            fontWeight: "bold",
            borderRadius: 3,
            borderColor: "#d50000",
            color: "#d50000",
            boxShadow: "0 4px 10px rgba(255,0,0,0.2)",
            transition: "all 0.3s ease",

            "&:hover": {
              background: "linear-gradient(135deg,#ff1744,#d50000)",
              color: "#fff",
              borderColor: "#d50000",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(255,0,0,0.4)"
            }
          }}
        >
          {darkMode ? "☀ " : "🌙 "}
        </Button>

      </Stack>

      <EmployeeTable
        employees={filteredEmployees}
        searchText={search}
        darkMode={darkMode}
        onEdit={(id) => navigate(`/edit/${id}`)}
        onDelete={handleDelete}
      />

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