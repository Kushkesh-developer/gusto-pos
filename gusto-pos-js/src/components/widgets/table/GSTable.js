import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Box,
  TableContainer,
  Paper,

  TextField } from
"@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PaginationComponent from "./Pagination";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";

import Image from "next/image";
import Input from "@mui/material/Input";
import { alpha, useTheme } from "@mui/material/styles";
























const GSTable = ({
  columns,
  filteredColumns,
  currentItems,
  currentPage,
  totalPages,
  hidePagination,
  handlePageChange = () => {},
  sx = {},
  setFilteredColumns
}) => {
  const theme = useTheme();
  const [editingRow, setEditingRow] = useState({
    id: null,
    data: {}
  });

  const handleDelete = (id) => {
    return () => {
      if (setFilteredColumns) {
        setFilteredColumns((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
        );
      }
    };
  };

  const handleToggleChange = (key, checked) => {
    setEditingRow((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: checked
      }
    }));
  };

  const startEditing = (row) => {
    setEditingRow({
      id: row.id,
      data: { ...row }
    });
  };

  const cancelEditing = () => {
    setEditingRow({
      id: null,
      data: {}
    });
  };

  const handleEditChange = (key, value) => {
    setEditingRow((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value
      }
    }));
  };

  const handleImageChange = (key, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleEditChange(key, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = () => {
    // In a real application, you would save the changes here
    cancelEditing();
  };

  // Mapping function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting":
        return "gray";
      case "Active":
        return "green";
      case "Pending":
        return "orange";
      case "Cancelled":
        return "red";
      default:
        return "black";
    }
  };

  const renderCell = (value, column) => {
    const isEditing = editingRow.id === value.id;
    const cellValue = isEditing ? editingRow.data[column.key] : value[column.key];

    if (column.type === "image") {
      return isEditing ?
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {cellValue &&
        <Image
          src={cellValue}
          alt={value.Name || column.label}
          width={80}
          height={80} />

        }
          <label htmlFor={`image-upload-${value.id}-${column.key}`}>
            <Input
            id={`image-upload-${value.id}-${column.key}`}
            type="file"
            onChange={(e) => handleImageChange(column.key, e)}
            inputProps={{ accept: 'image/*' }}
            sx={{ display: 'none' }} />

            <Box
            component="span"
            sx={{
              display: 'inline-block',
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              width: '100px',
              color: theme.palette.primary.main
            }}>

              Choose file
            </Box>
          </label>
        </Box> :

      <Image
        src={cellValue}
        alt={value.Name || column.label}
        width={80}
        height={80} />;


    }

    if (column.type === "toggle") {
      return (
        <GSSwitchButton
          checked={!!cellValue}
          onChange={(e) => {
            if (isEditing) {
              handleToggleChange(column.key, e.target.checked);
            }
          }}
          disabled={!isEditing} />);


    }

    if (column.isAction && column.actions) {
      return (
        <Box sx={{ display: "flex", gap: 0 }}>
          {isEditing ?
          <>
              <IconButton size="small" onClick={saveEdit}>
                <CheckIcon sx={{ color: "green" }} />
              </IconButton>
              <IconButton size="small" onClick={cancelEditing}>
                <CloseIcon sx={{ color: "red" }} />
              </IconButton>
            </> :

          column.actions.map((action, idx) =>
          <IconButton
            key={idx}
            onClick={
            action.type === "delete" ?
            handleDelete(value.id) :
            action.type === "edit" ?
            () => startEditing(value) :
            action.handler ?
            () => action.handler(value.id) :
            undefined
            }>

                {action.type === "edit" ?
            <EditIcon style={{ color: theme.palette.primary.main }} /> :

            <DeleteIcon style={{ color: theme.palette.primary.main }} />
            }
              </IconButton>
          )
          }
        </Box>);

    }

    if (isEditing && !column.readOnly) {
      if (column.key === "status") {
        return (
          <TextField
            select
            value={cellValue}
            onChange={(e) => handleEditChange(column.key, e.target.value)}
            size="small"
            fullWidth
            SelectProps={{
              native: true
            }}>

            {["Active", "Pending", "Waiting", "Cancelled"].map((status) =>
            <option key={status} value={status}>
                {status}
              </option>
            )}
          </TextField>);

      }

      if (column.key === "RewardValidPeriod") {
        return (
          <Input
            type="date"
            value={cellValue}
            onChange={(e) => handleEditChange(column.key, e.target.value)}
            fullWidth />);


      }

      return (
        <TextField
          value={cellValue}
          onChange={(e) => handleEditChange(column.key, e.target.value)}
          size="small"
          fullWidth />);


    }

    if (column.key === "status") {
      return (
        <span style={{ color: getStatusColor(cellValue) }}>
          {cellValue}
        </span>);

    }

    return <span>{String(cellValue)}</span>;
  };

  return (
    <TableContainer component={Paper} sx={{ pb: 2, ...sx }}>
      <Table stickyHeader>
        <TableHead
          style={{
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            fontSize: "20px",
            fontWeight: "bold"
          }}>

          <TableRow>
            {columns.map(
              (column) =>
              column.visible &&
              <TableCell
                sx={{ backgroundColor: "transparent" }}
                key={column.key}>

                    {column.label}
                  </TableCell>

            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredColumns.length === 0 ?
          <TableRow>
              <TableCell colSpan={columns.length} align="center">
                Record Not Found
              </TableCell>
            </TableRow> :

          currentItems.map((value) =>
          <TableRow
            key={value.id}
            sx={{
              backgroundColor: editingRow.id === value.id ?
              alpha(theme.palette.primary.main, 0.05) :
              'inherit'
            }}>

                {columns.map(
              (column) =>
              column.visible &&
              <TableCell key={column.key}>
                        {renderCell(value, column)}
                      </TableCell>

            )}
              </TableRow>
          )
          }
        </TableBody>
      </Table>
      {!hidePagination && filteredColumns.length > 0 &&
      <PaginationComponent
        count={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange} />

      }
    </TableContainer>);

};

export default GSTable;