

import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";

const EmployeeTable = ({
  employees = [],
  searchText = "",
  darkMode,
  onEdit,
  onDelete,
}) => {
 
  const highlightText = (value) => {
    
    const text =
      value !== undefined && value !== null ? String(value) : "";

    if (!searchText) return text;

    // Escape special regex characters
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
        borderRadius: 1,
        boxShadow: 1,
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
        <TableHead sx={{ backgroundColor: darkMode ? "#333" : "#ddd" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <TableRow key={emp?.id}>
                <TableCell>{highlightText(emp?.id)}</TableCell>
                <TableCell>{highlightText(emp?.name)}</TableCell>
                <TableCell>{highlightText(emp?.email)}</TableCell>
                <TableCell>{highlightText(emp?.mobile)}</TableCell>
                <TableCell>{highlightText(emp?.country)}</TableCell>

                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(emp?.id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(emp?.id)}
                  >
                    Delete
                  </Button>
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
    </Box>
  );
};

export default EmployeeTable;