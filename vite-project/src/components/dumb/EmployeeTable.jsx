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

  /* ===== SORTING LOGIC ===== */

  const sortedEmployees = useMemo(() => {

    const sorted = [...employees].sort((a, b) => {

      const aValue = a[orderBy];
      const bValue = b[orderBy];

      // Numeric sorting (ID, Mobile)
      if (orderBy === "id" || orderBy === "mobile") {

        return order === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);

      }

      // String sorting (Name, Email, Country)
      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));

    });

    return sorted;

  }, [employees, order, orderBy]);

  const paginated = sortedEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /* ===== SEARCH HIGHLIGHT ===== */

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
        background: "linear-gradient(145deg,#ffffff,#f0f7ff)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 16
        }
      }}
    >

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Employee List
        </Typography>
      </Box>

      <Table>

        <TableHead
          sx={{
            background:
              "linear-gradient(90deg,#1976d2,#42a5f5)"
          }}
        >

          <TableRow>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              <TableSortLabel
                active={orderBy === "id"}
                direction={order}
                onClick={() => handleSort("id")}
              >
                ID
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={order}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              <TableSortLabel
                active={orderBy === "email"}
                direction={order}
                onClick={() => handleSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              <TableSortLabel
                active={orderBy === "mobile"}
                direction={order}
                onClick={() => handleSort("mobile")}
              >
                Mobile
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              <TableSortLabel
                active={orderBy === "country"}
                direction={order}
                onClick={() => handleSort("country")}
              >
                Country
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
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
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "#f1f7ff",
                    transform: "scale(1.01)"
                  }
                }}
              >

                <TableCell>{highlightText(emp.id)}</TableCell>

                <TableCell sx={{ fontWeight: 500 }}>
                  {highlightText(emp.name)}
                </TableCell>

                <TableCell>
                  {highlightText(emp.email)}
                </TableCell>

                <TableCell>{emp.mobile}</TableCell>

                <TableCell>{emp.country}</TableCell>

                <TableCell>

                  <Tooltip title="Edit Employee">

                    <IconButton
                      color="primary"
                      sx={{
                        transition: "0.2s",
                        "&:hover": {
                          transform: "scale(1.2)"
                        }
                      }}
                      onClick={() => onEdit(emp.id)}
                    >
                      <EditIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Delete Employee">

                    <IconButton
                      color="error"
                      sx={{
                        transition: "0.2s",
                        "&:hover": {
                          transform: "scale(1.2)"
                        }
                      }}
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

                <Typography sx={{ py: 3 }}>
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
      />

    </Paper>
  );
};

export default EmployeeTable;