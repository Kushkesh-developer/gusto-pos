import React from "react";
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
} from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { alpha, useTheme } from '@mui/material/styles';
import PaginationComponent from "./Pagination";

interface ColumnType {
  label: string;
  key: string;
  visible: boolean;
  isAction?: boolean;
  isVisibility?: boolean; 
}

interface TableProps {
  columns: ColumnType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredUsers: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentItems: any[];
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  keyMapping: { [key: string]: string };
}

const GSTable = ({
  columns,
  filteredUsers,
  currentItems,
  currentPage,
  totalPages,
  handlePageChange,
}: TableProps) => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper} style={{ paddingBottom: "10px" }}>
      <Table>
        <TableHead
          style={{
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <TableRow>
            {columns.map((column) => {
            if (!column.visible){
              return null;
            }
            return (
              <TableCell key={column.key}>{column.label}</TableCell>
            )})}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                Record Not Found
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((value) => (
              <TableRow key={value.id}>
                {columns.map((column) => {
                  if (!column.visible) {
                    return null;
                  }
                  return (
                    <TableCell key={column.key}>
                      {column.isAction ? (
                        <Box sx={{ display: 'flex', gap: 0 }}>
                          {/* Conditional rendering of Edit and Delete icons */}
                          <IconButton component={Link} href={`/attendance/${value.id}`}>
                            <EditIcon style={{ color: theme.palette.primary.main }} />
                          </IconButton>
                          <IconButton component={Link} href={`/attendance/${value.id}`}>
                            <DeleteIcon style={{ color: theme.palette.primary.main }} />
                          </IconButton>
                        </Box>
                      ) : column.isVisibility ? (
                        <Box sx={{ display: 'flex', gap: 0 }}>
                          {/* Conditional rendering of Visibility icon */}
                          <IconButton component={Link} href={`/attendance/${value.id}`}>
                            <VisibilityIcon style={{ color: theme.palette.primary.main }} />
                          </IconButton>
                        </Box>
                      ) : (
                        <span>{value[column.key]}</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {filteredUsers.length > 0 && (
        <PaginationComponent
          count={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </TableContainer>
  );
};

export default GSTable;
