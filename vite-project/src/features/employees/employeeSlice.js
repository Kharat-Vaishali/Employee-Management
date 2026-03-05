import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

/* ================= FETCH ALL EMPLOYEES ================= */

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/employee");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch employees"
      );
    }
  }
);

/* ================= FETCH EMPLOYEE BY ID ================= */

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/employee/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue("Employee not found",err);
    }
  }
);

/* ================= ADD EMPLOYEE ================= */

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/employee", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to add employee"
      );
    }
  }
);

/* ================= UPDATE EMPLOYEE ================= */

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/employee/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to update employee"
      );
    }
  }
);

/* ================= DELETE EMPLOYEE ================= */

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/employee/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to delete employee"
      );
    }
  }
);

/* ================= SLICE ================= */

const employeeSlice = createSlice({
  name: "employees",

  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== FETCH ALL ===== */

      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== FETCH BY ID ===== */

      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })

      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD EMPLOYEE ===== */

      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;

        const newEmployee = action.payload;

        // Remove duplicate if exists
        state.list = state.list.filter(
          (emp) => emp.id !== newEmployee.id
        );

        // Add new employee at top
        state.list = [newEmployee, ...state.list];

        state.success = "Employee added successfully";
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE EMPLOYEE ===== */

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex(
          (emp) => emp.id === action.payload.id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }

        state.success = "Employee updated successfully";
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE EMPLOYEE ===== */

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;

        state.list = state.list.filter(
          (emp) => emp.id !== action.payload
        );

        state.success = "Employee deleted successfully";
      })

      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = employeeSlice.actions;

export default employeeSlice.reducer;