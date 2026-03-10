

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  updateEmployee,
  fetchEmployeeById,
  clearMessages,
} from "../../features/employees/employeeSlice";

import { fetchCountries } from "../../features/countries/countrySlice";
import EmployeeForm from "../dumb/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";

import {
  Container,
  Typography,
  Snackbar,
  Stack,
  Box,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";

const EmployeeFormContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selected, loading, success, error } =
    useSelector((state) => state.employees);

  const { list: countries } =
    useSelector((state) => state.countries);

  const [darkMode, setDarkMode] = useState(false);

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
      navigate("/");
    }

  };

  const themeStyles = {
    backgroundColor: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#fff" : "#000",
    minHeight: "100vh",
    padding: "20px",
    transition: "all 0.3s ease"
  };

  return (

    <Box sx={themeStyles}>

      <Container maxWidth="sm">

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mb: 3 }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            color={darkMode ? "#fff" : "#000"}
          >
            {id ? "" : ""}
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={(e) =>
                  setDarkMode(e.target.checked)
                }
              />
            }
            label="Dark Mode"
          />

        </Stack>

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