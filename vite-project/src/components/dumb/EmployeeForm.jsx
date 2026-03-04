

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, MenuItem, Stack } from "@mui/material";

const EmployeeForm = ({ onSubmit, countries = [], defaultValues, darkMode }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });

  // Reset form when editing
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const inputStyle = {
    input: { color: darkMode ? "#fff" : "#000" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: darkMode ? "#666" : "#ccc" },
    },
    "& .MuiFormHelperText-root": { color: darkMode ? "#bbb" : "#f00" },
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: 400, width: "100%" }}>
        <TextField
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="Mobile"
          {...register("mobile", {
            required: "Mobile is required",
            minLength: {
              value: 10,
              message: "Minimum 10 digits",
            },
          })}
          error={!!errors.mobile}
          helperText={errors.mobile?.message}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          select
          label="Country"
          defaultValue=""
          {...register("country", { required: "Country required" })}
          error={!!errors.country}
          helperText={errors.country?.message}
          fullWidth
          sx={inputStyle}
        >
          <MenuItem value="">Select Country</MenuItem>
          {countries.length > 0 ? (
            countries.map((country, idx) => (
              <MenuItem key={country.id || idx} value={country.name}>
                {country.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Countries Found</MenuItem>
          )}
        </TextField>

        <TextField
          label="State"
          {...register("state", { required: "State required" })}
          error={!!errors.state}
          helperText={errors.state?.message}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="District"
          {...register("district", { required: "District required" })}
          error={!!errors.district}
          helperText={errors.district?.message}
          fullWidth
          sx={inputStyle}
        />

        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default EmployeeForm;
