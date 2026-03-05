import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Paper,
  Typography
} from "@mui/material";

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

    <Paper
      elevation={10}
      sx={{
        p: 4,
        maxWidth: 420,
        margin: "auto",
        borderRadius: 4,
        background:
          "linear-gradient(135deg,#ffffff,#f0f7ff)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 12
        }
      }}
    >

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
        textAlign="center"
      >
        Employee Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>

        <Stack spacing={2}>

          <TextField
            label="Name"
            {...register("name", { required: "Name required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />

          <TextField
            label="Email"
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Mobile"
            {...register("mobile", { required: "Mobile required" })}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
            fullWidth
          />

          <TextField
            select
            label="Country"
            defaultValue=""
            {...register("country", { required: "Country required" })}
            error={!!errors.country}
            helperText={errors.country?.message}
            fullWidth
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
            {...register("state", { required: "State required" })}
            error={!!errors.state}
            helperText={errors.state?.message}
            fullWidth
          />

          <TextField
            label="District"
            {...register("district", { required: "District required" })}
            error={!!errors.district}
            helperText={errors.district?.message}
            fullWidth
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 1,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: 3,
              background:
                "linear-gradient(90deg,#1976d2,#42a5f5)",
              "&:hover": {
                background:
                  "linear-gradient(90deg,#1565c0,#1e88e5)"
              }
            }}
          >
            Save Employee
          </Button>

        </Stack>

      </form>

    </Paper>
  );
};

export default EmployeeForm;