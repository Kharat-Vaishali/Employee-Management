import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

/* ================= FETCH ALL ================= */

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/employee");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch employees");
    }
  }
);

/* ================= FETCH BY ID ================= */

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/employee/${id}`);
      return response.data;
    } catch {
      return rejectWithValue("Employee not found");
    }
  }
);

/* ================= ADD ================= */

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/employee", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Add failed");
    }
  }
);

/* ================= UPDATE ================= */

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/employee/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

/* ================= DELETE ================= */

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/employee/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
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

      /* ---------- FETCH ALL ---------- */
      .addCase(fetchEmployees.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchEmployees.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      /* ---------- FETCH BY ID ---------- */
      .addCase(fetchEmployeeById.fulfilled, (s, a) => {
        s.selected = a.payload;
      })
      .addCase(fetchEmployeeById.rejected, (s, a) => {
        s.error = a.payload;
      })

      /* ---------- ADD ---------- */
      .addCase(addEmployee.pending, (s) => {
        s.loading = true;
      })
      .addCase(addEmployee.fulfilled, (s, a) => {
        s.loading = false;
        s.list.push(a.payload);
        s.success = "Employee added successfully";
      })
      .addCase(addEmployee.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateEmployee.fulfilled, (s, a) => {
        const index = s.list.findIndex(
          (e) => e.id === a.payload.id
        );

        if (index !== -1) {
          s.list[index] = a.payload;
        }

        s.success = "Employee updated successfully";
      })
      .addCase(updateEmployee.rejected, (s, a) => {
        s.error = a.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteEmployee.fulfilled, (s, a) => {
        s.list = s.list.filter(
          (e) => e.id !== a.payload
        );
        s.success = "Employee deleted successfully";
      })
      .addCase(deleteEmployee.rejected, (s, a) => {
        s.error = a.payload;
      });
  },
});

export const { clearMessages } = employeeSlice.actions;
export default employeeSlice.reducer;