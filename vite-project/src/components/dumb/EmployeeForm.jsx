

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
  Box,
  InputAdornment
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";

const EmployeeForm = ({ onSubmit, countries = [], defaultValues, darkMode }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });

  /* Detect Add or Edit */

  const isEdit = defaultValues && defaultValues.id;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: darkMode ? "#121212" : "#f4f6fb",
        color: darkMode ? "#fff" : "#000",
        transition: "all 0.3s ease"
      }}
    >

      <Box
        sx={{
          width: 360,
          p: 4,
          borderRadius: 4,
          background: darkMode ? "#1e1e1e" : "transparent",
          boxShadow: darkMode
            ? "0 0 20px rgba(255,0,0,0.2)"
            : "none"
        }}
      >

        {/* TOP RED CURVE */}

        <Box
          sx={{
            height: 120,
            background: "linear-gradient(135deg,#ff1744,#d50000)",
            borderBottomLeftRadius: "60% 40%",
            borderBottomRightRadius: "60% 40%"
          }}
        />

        <Box sx={{ mt: -6 }}>

          {/* Dynamic Title */}

          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={3}
            color={darkMode ? "#fff" : "#000"}
          >
            {isEdit ? "Edit Employee" : " Employee Details"}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={2}>

              {/* NAME */}

              <TextField
                label="Name"
                size="small"
                fullWidth
                {...register("name", { required: "Name required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
                sx={inputStyle(darkMode)}
              />

              {/* EMAIL */}

              <TextField
                label="Email"
                size="small"
                fullWidth
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email"
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}
                sx={inputStyle(darkMode)}
              />

              {/* MOBILE */}

              <TextField
                label="Mobile"
                size="small"
                fullWidth
                {...register("mobile", {
                  required: "Mobile number required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Mobile number must be 10 digits"
                  }
                })}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
                sx={inputStyle(darkMode)}
              />

              {/* COUNTRY */}

              <TextField
                select
                label="Country"
                size="small"
                fullWidth
                defaultValue=""
                {...register("country", { required: "Country required" })}
                error={!!errors.country}
                helperText={errors.country?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicIcon />
                    </InputAdornment>
                  )
                }}
                sx={inputStyle(darkMode)}
              >

                <MenuItem value="">Select Country</MenuItem>

                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}

              </TextField>

              {/* STATE */}

              <TextField
                label="State"
                size="small"
                fullWidth
                {...register("state", { required: "State required" })}
                error={!!errors.state}
                helperText={errors.state?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon />
                    </InputAdornment>
                  )
                }}
                sx={inputStyle(darkMode)}
              />

              {/* DISTRICT */}

              <TextField
                label="District"
                size="small"
                fullWidth
                {...register("district", { required: "District required" })}
                error={!!errors.district}
                helperText={errors.district?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapIcon />
                    </InputAdornment>
                  )
                }}
                sx={inputStyle(darkMode)}
              />

              {/* SUBMIT BUTTON */}

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: 5,
                  py: 1.2,
                  background:
                    "linear-gradient(135deg,#ff1744,#d50000)",
                  fontWeight: "bold",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#d50000,#b71c1c)"
                  }
                }}
              >
                Save Employee
              </Button>

            </Stack>

          </form>

        </Box>

      </Box>

    </Box>
  );
};

const inputStyle = (darkMode) => ({
  "& .MuiOutlinedInput-root": {
    background: darkMode ? "#2a2a2a" : "#fff",
    color: darkMode ? "#fff" : "#000",
    "& fieldset": {
      borderColor: darkMode ? "#555" : "#ccc"
    }
  },
  "& .MuiInputLabel-root": {
    color: darkMode ? "#bbb" : "#555"
  }
});

export default EmployeeForm;