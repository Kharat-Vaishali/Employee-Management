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
  DialogActions,
  IconButton,
  Box,
  InputAdornment
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

const EmployeeContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: employees = [], error, success } =
    useSelector((state) => state.employees);

  const [search, setSearch] = useState("");

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

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (

    <Container
      maxWidth={false}
      sx={{
        width: "100%",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: { xs: 2, sm: 3 },
        transition: "all 0.3s ease"
      }}
    >

      {/* HEADER */}

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb:3,
          background:"linear-gradient(135deg,#ff1744,#d50000)",
          WebkitBackgroundClip:"text",
          WebkitTextFillColor:"transparent"
        }}
      >
        Employee Management
      </Typography>

      {/* ACTION BAR */}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >

        {/* LEFT SIDE */}

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ width:"70%" }}
        >

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => navigate("/add", { state: { darkMode } })}
            sx={{
              minWidth:170,
              height:40,
              background:"linear-gradient(135deg,#ff1744,#d50000)",
              fontWeight:"bold",
              borderRadius:2,
              transition:"all 0.3s ease",
              boxShadow:"0 6px 15px rgba(255,0,0,0.3)",

              "&:hover":{
                background:"linear-gradient(135deg,#d50000,#b71c1c)",
                transform:"translateY(-2px)",
                boxShadow:"0 10px 25px rgba(255,0,0,0.4)"
              }
            }}
          >
            Add Employee
          </Button>

          <TextField
            placeholder="Search by ID, Name, Email"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex:1,

              input:{
                color: darkMode ? "#fff" : "#000"
              },

              "& .MuiOutlinedInput-root":{
                background: darkMode ? "#1f1f1f" : "#fff",
                borderRadius:2
              }
            }}

            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              )
            }}
          />

        </Stack>

        {/* RIGHT SIDE DARK MODE */}

        <IconButton
          onClick={toggleDarkMode}
          sx={{
            width:40,
            height:40,
            color: darkMode ? "#fff" : "#000",
            transition:"0.3s",

            "&:hover":{
              transform:"scale(1.2)"
            }
          }}
        >
          {darkMode ? <LightModeIcon/> : <DarkModeIcon/>}
        </IconButton>

      </Stack>

      {/* TABLE */}

      <EmployeeTable
        employees={filteredEmployees}
        searchText={search}
        darkMode={darkMode}
        onEdit={(id) => navigate(`/edit/${id}`, { state: { darkMode } })}
        onDelete={handleDelete}
      />

      {/* DELETE DIALOG */}

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