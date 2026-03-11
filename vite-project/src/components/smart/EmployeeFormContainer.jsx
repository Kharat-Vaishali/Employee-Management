

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  updateEmployee,
  fetchEmployeeById,
  clearMessages,
} from "../../features/employees/employeeSlice";

import { fetchCountries } from "../../features/countries/countrySlice";
import EmployeeForm from "../dumb/EmployeeForm";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
  Container,
  Snackbar,
  Stack,
  Box,
  CircularProgress
} from "@mui/material";

const EmployeeFormContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { selected, loading, success, error } =
    useSelector((state) => state.employees);

  const { list: countries } =
    useSelector((state) => state.countries);

  /* Dark mode from navigation or localStorage */

  const darkMode =
    location.state?.darkMode ??
    localStorage.getItem("darkMode") === "true";

  useEffect(() => {

    dispatch(fetchCountries());

    if (id) {
      dispatch(fetchEmployeeById(id));
    }

  }, [dispatch, id]);

  const handleSubmit = async (data) => {

    let result;

    if (id) {
      result = await dispatch(updateEmployee({ id, data }));
    } else {
      result = await dispatch(addEmployee(data));
    }

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/", { state: { darkMode } });
    }

  };

  const themeStyles = {
    backgroundColor: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#fff" : "#000",
    minHeight: "100vh",
    padding: "20px"
  };

  return (

    <Box sx={themeStyles}>

      <Container maxWidth="sm">

        <Stack sx={{ mb: 3 }} />

        {loading ? (

          <CircularProgress />

        ) : (

          <EmployeeForm
            onSubmit={handleSubmit}
            countries={countries}
            defaultValues={selected}
            darkMode={darkMode}
          />

        )}

        <Snackbar
          open={!!success || !!error}
          autoHideDuration={3000}
          message={success || error}
          onClose={() => dispatch(clearMessages())}
        />

      </Container>

    </Box>

  );

};

export default EmployeeFormContainer;