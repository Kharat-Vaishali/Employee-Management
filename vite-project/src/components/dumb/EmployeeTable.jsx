       



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
  TableSortLabel,
  TableContainer
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

  const [order, setOrder] = useState("desc");
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
            backgroundColor: "#fff9c4",
            color: "#5d4037",
            padding: "2px 6px",
            borderRadius: "6px",
            fontWeight: "bold",
            boxShadow: "0 0 4px rgba(255,235,59,0.4)"
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
      elevation={12}
      sx={{
        borderRadius: 4,
        mt: 3,
        overflow: "hidden",
        background: darkMode
          ? "#121212"
          : "linear-gradient(145deg,#ffffff,#fff5f5)",
        transition: "0.3s",
        boxShadow: darkMode
          ? "0 0 20px rgba(255,0,0,0.2)"
          : "0 10px 30px rgba(255,0,0,0.15)"
      }}
    >

      <Box sx={{ p: { xs: 1.5, md: 2 } }}>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            color: darkMode ? "#fff" : "#b71c1c",
            textShadow: darkMode
              ? "0 0 6px rgba(255,0,0,0.6)"
              : "none"
          }}
        >
          Employee List
        </Typography>

      </Box>

      {/* RESPONSIVE TABLE CONTAINER */}

      <TableContainer sx={{ overflowX: "auto" }}>

        <Table>

          <TableHead
            sx={{
              background:
                "linear-gradient(90deg,#ff1744,#d50000)"
            }}
          >

            <TableRow>

              {["id","name","email","mobile","country"].map((col) => (

                <TableCell
                  key={col}
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize:{ xs:"12px", md:"14px" }
                  }}
                >

                  <TableSortLabel
                    active={orderBy === col}
                    direction={order}
                    onClick={() => handleSort(col)}
                    sx={{
                      color:"#fff",
                      "&.Mui-active": {
                        color:"#fff"
                      }
                    }}
                  >
                    {col.toUpperCase()}
                  </TableSortLabel>

                </TableCell>

              ))}

              <TableCell
                sx={{
                  color:"#fff",
                  fontWeight:"bold",
                  fontSize:{ xs:"12px", md:"14px" }
                }}
              >
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
                      color: darkMode ? "#fff" : "#000",
                      fontSize:{ xs:"12px", md:"14px" }
                    },

                    transition:"all 0.25s ease",

                    "&:hover": {
                      backgroundColor: darkMode
                        ? "#2a2a2a"
                        : "#fff0f0",
                      transform:"scale(1.01)",
                      boxShadow:"0 0 12px rgba(255,0,0,0.2)"
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
                        onClick={() => onEdit(emp.id)}
                        size="small"
                        sx={{
                          color:"#1976d2",
                          transition:"0.3s",
                          "&:hover":{
                            transform:"scale(1.25)",
                            boxShadow:"0 0 10px rgba(33,150,243,0.7)"
                          }
                        }}
                      >
                        <EditIcon fontSize="small"/>
                      </IconButton>

                    </Tooltip>

                    <Tooltip title="Delete">

                      <IconButton
                        onClick={() => onDelete(emp.id)}
                        size="small"
                        sx={{
                          color:"#d32f2f",
                          transition:"0.3s",
                          "&:hover":{
                            transform:"scale(1.25)",
                            boxShadow:"0 0 10px rgba(255,0,0,0.7)"
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small"/>
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

      </TableContainer>

      <TablePagination
        component="div"
        count={employees.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5,10,25]}
        onRowsPerPageChange={handleRowsPerPage}
        sx={{
          color: darkMode ? "#fff" : "#000",
          "& .MuiTablePagination-toolbar":{
            flexWrap:"wrap"
          }
        }}
      />

    </Paper>
  );
};

export default EmployeeTable;