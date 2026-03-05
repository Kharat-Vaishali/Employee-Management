import React, { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  Tooltip,
  Paper,
  Box,
  Typography,
  TableSortLabel
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EmployeeTable = ({
  employees = [],
  searchText = "",
  darkMode = false,
  onEdit,
  onDelete
}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedEmployees = useMemo(() => {

    return [...employees].sort((a, b) => {

      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (orderBy === "id" || orderBy === "mobile") {
        return order === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));

    });

  }, [employees, order, orderBy]);

  const paginated = sortedEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const highlightText = (value) => {

    const text = value ? String(value) : "";

    if (!searchText) return text;

    const regex = new RegExp(`(${searchText})`, "gi");

    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span
          key={index}
          style={{
            backgroundColor: "#ffe082",
            padding: "2px 4px",
            borderRadius: "4px",
            fontWeight: "bold"
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (

    <Paper
      elevation={10}
      sx={{
        borderRadius: 4,
        mt: 3,
        overflow: "hidden",
        background: darkMode
          ? "#1e1e1e"
          : "linear-gradient(145deg,#ffffff,#f0f7ff)"
      }}
    >

      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={darkMode ? "#fff" : "#000"}
        >
          Employee List
        </Typography>
      </Box>

      <Table>

        <TableHead
          sx={{
            background: darkMode
              ? "#333"
              : "linear-gradient(90deg,#1976d2,#42a5f5)"
          }}
        >

          <TableRow>

            {["id","name","email","mobile","country"].map((col) => (

              <TableCell
                key={col}
                sx={{
                  color: "#fff",
                  fontWeight: "bold"
                }}
              >

                <TableSortLabel
                  active={orderBy === col}
                  direction={order}
                  onClick={() => handleSort(col)}
                >
                  {col.toUpperCase()}
                </TableSortLabel>

              </TableCell>

            ))}

            <TableCell sx={{ color:"#fff", fontWeight:"bold" }}>
              Actions
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {paginated.length > 0 ? (

            paginated.map((emp) => (

              <TableRow
                key={emp.id}
                hover
                sx={{
                  backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                  "& td": {
                    color: darkMode ? "#fff" : "#000"
                  },
                  "&:hover": {
                    backgroundColor: darkMode
                      ? "#2a2a2a"
                      : "#f1f7ff"
                  }
                }}
              >

                <TableCell>{highlightText(emp.id)}</TableCell>
                <TableCell>{highlightText(emp.name)}</TableCell>
                <TableCell>{highlightText(emp.email)}</TableCell>
                <TableCell>{emp.mobile}</TableCell>
                <TableCell>{emp.country}</TableCell>

                <TableCell>

                  <Tooltip title="Edit">

                    <IconButton
                      color="primary"
                      onClick={() => onEdit(emp.id)}
                    >
                      <EditIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Delete">

                    <IconButton
                      color="error"
                      onClick={() => onDelete(emp.id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </Tooltip>

                </TableCell>

              </TableRow>

            ))

          ) : (

            <TableRow>

              <TableCell colSpan={6} align="center">

                <Typography color={darkMode ? "#fff" : "#000"}>
                  No Employees Found
                </Typography>

              </TableCell>

            </TableRow>

          )}

        </TableBody>

      </Table>

      <TablePagination
        component="div"
        count={employees.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5,10,25]}
        onRowsPerPageChange={handleRowsPerPage}
        sx={{
          color: darkMode ? "#fff" : "#000"
        }}
      />

    </Paper>
  );
};

export default EmployeeTable;
