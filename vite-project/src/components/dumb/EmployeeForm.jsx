import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Paper,
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

const EmployeeForm = ({ onSubmit, countries = [], defaultValues }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });

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
        background: "#f4f6fb"
      }}
    >

      <Paper
        elevation={12}
        sx={{
          width: 360,
          borderRadius: 6,
          overflow: "hidden",
          background: "#fff"
        }}
      >

        {/* Top Gradient */}

        <Box
          sx={{
            height: 120,
            background:
              "linear-gradient(135deg,#ff1744,#d50000)",
            borderBottomLeftRadius: "60% 40%",
            borderBottomRightRadius: "60% 40%"
          }}
        />

        <Box sx={{ p: 4, mt: -6 }}>

          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={3}
          >
            Employee Form
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={2}>

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
              />

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
              />

              <TextField
                label="Mobile"
                size="small"
                fullWidth
                {...register("mobile", { required: "Mobile required" })}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
              />

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
              >

                <MenuItem value="">Select Country</MenuItem>

                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}

              </TextField>

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
              />

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
              />

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

        {/* Bottom Wave */}

        <Box
          sx={{
            height: 90,
            background:
              "linear-gradient(135deg,#ff1744,#d50000)",
            borderTopLeftRadius: "60% 40%",
            borderTopRightRadius: "60% 40%"
          }}
        />

      </Paper>

    </Box>
  );
};

export default EmployeeForm;