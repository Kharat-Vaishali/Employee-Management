import React, { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TableSortLabel,
  TablePagination,
  IconButton,
  Tooltip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EmployeeTable = ({
  employees = [],
  searchText = "",
  darkMode,
  onEdit,
  onDelete,
}) => {

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sort employees
  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {

      const aValue = a[orderBy] || "";
      const bValue = b[orderBy] || "";

      if (order === "asc") {
        return String(aValue).localeCompare(String(bValue));
      }

      return String(bValue).localeCompare(String(aValue));

    });
  }, [employees, order, orderBy]);

  // Pagination logic
  const paginatedEmployees = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedEmployees.slice(start, start + rowsPerPage);
  }, [sortedEmployees, page, rowsPerPage]);

  // Highlight search text
  const highlightText = (value) => {

    const text =
      value !== undefined && value !== null ? String(value) : "";

    if (!searchText) return text;

    const safeSearch = searchText.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(`(${safeSearch})`, "gi");

    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span
          key={index}
          style={{
            backgroundColor: "yellow",
            color: "black",
            padding: "2px 4px",
            borderRadius: "4px",
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
    <Box
      sx={{
        overflowX: "auto",
        borderRadius: 2,
        boxShadow: 3,
        mt: 2,
      }}
    >

      <Table
        sx={{
          minWidth: 650,
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          "& th, & td": {
            color: darkMode ? "#fff" : "#000",
            whiteSpace: "nowrap",
          },
        }}
      >

        <TableHead
          sx={{
            backgroundColor: darkMode ? "#333" : "#ddd",
          }}
        >

          <TableRow>

            <TableCell>

              <TableSortLabel
                active={orderBy === "id"}
                direction={order}
                onClick={() => handleSort("id")}
              >
                ID
              </TableSortLabel>

            </TableCell>

            <TableCell>

              <TableSortLabel
                active={orderBy === "name"}
                direction={order}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>

            </TableCell>

            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Country</TableCell>

            <TableCell align="center">
              Actions
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {paginatedEmployees.length > 0 ? (

            paginatedEmployees.map((emp) => (

              <TableRow
                key={emp?.id}
                hover
                sx={{
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: darkMode
                      ? "#2a2a2a"
                      : "#f9f9f9"
                  }
                }}
              >

                <TableCell>
                  {highlightText(emp?.id)}
                </TableCell>

                <TableCell>
                  {highlightText(emp?.name)}
                </TableCell>

                <TableCell>
                  {highlightText(emp?.email)}
                </TableCell>

                <TableCell>
                  {highlightText(emp?.mobile)}
                </TableCell>

                <TableCell>
                  {highlightText(emp?.country)}
                </TableCell>

                <TableCell align="center">

                  <Tooltip title="Edit Employee">

                    <IconButton
                      color="primary"
                      onClick={() => onEdit(emp?.id)}
                    >
                      <EditIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Delete Employee">

                    <IconButton
                      color="error"
                      onClick={() => onDelete(emp?.id)}
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
                No Data Found
              </TableCell>

            </TableRow>

          )}

        </TableBody>

      </Table>

      {/* Pagination */}

      <TablePagination
        component="div"
        count={employees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

    </Box>
  );
};

export default EmployeeTable;