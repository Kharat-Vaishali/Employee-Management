




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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmployeeContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: employees = [], error, success } = useSelector(
    (state) => state.employees
  );

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Fetch employees on mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // ✅ Direct filtering (no debounce, no delay)
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
    if (window.confirm("Are you sure to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: { xs: 2, sm: 3 },
        transition: "all 0.4s ease",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Employee Management
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/add")}
          sx={{
            minWidth: 150,
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            fontWeight: "bold",
          }}
        >
          Add Employee
        </Button>

        <TextField
          placeholder="Search by ID, Name, Email"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            input: { color: darkMode ? "#fff" : "#000" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode ? "#666" : "#ccc",
              },
            },
          }}
        />

        <Button
          variant="outlined"
          onClick={() => setDarkMode(!darkMode)}
          sx={{ minWidth: 150 }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </Button>
      </Stack>

      <EmployeeTable
        employees={filteredEmployees}
        searchText={search}
        darkMode={darkMode}
        onEdit={(id) => navigate(`/edit/${id}`)}
        onDelete={handleDelete}
      />

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