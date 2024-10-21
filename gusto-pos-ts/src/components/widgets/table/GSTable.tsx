/* eslint-disable @typescript-eslint/no-explicit-any */
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
  SxProps,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { alpha, useTheme } from "@mui/material/styles";
import PaginationComponent from "./Pagination";
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import { ColumnType } from "@/types/table-types";

// Define types for action
export type GSTableData = Record<string, unknown>[];

interface TableProps {
  columns: ColumnType[];
  filteredUsers: any[]; // Array of user data
  currentItems: any[];
  currentPage: number;
  totalPages: number;
  hidePagination?: boolean;
  handlePageChange?: (
    _event: React.ChangeEvent<unknown>,
    _page: number,
  ) => void;
  keyMapping?: { [key: string]: string };
  sx?: SxProps;
  setFilteredUsers: React.Dispatch<React.SetStateAction<any[]>>; // Add setter for updating filtered users
}

const GSTable = ({
  columns,
  filteredUsers,
  currentItems,
  currentPage,
  totalPages,
  hidePagination,
  handlePageChange = () => {},
  sx = {},
  setFilteredUsers, // Setter to update filteredUsers after deleting
}: TableProps) => {
  const theme = useTheme();
  const router = useRouter();

  const handleEdit = (id: string) => {
 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_event: React.MouseEvent<HTMLButtonElement>) => {
      router.push(`/edit/${id}`);
    };
  };
  
  const handleDelete = (username: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_event: React.MouseEvent<HTMLButtonElement>) => {
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
      console.log("Deleted user:", username);
    };
  };

  return (
    <TableContainer component={Paper} sx={{ pb: 2, ...sx }}>
      <Table stickyHeader>
        <TableHead
          style={{
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <TableRow>
            {columns.map((column) => {
              if (!column.visible) {
                return null;
              }
              return <TableCell key={column.key}>{column.label}</TableCell>;
            })}
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
                      {column.isAction && column.actions ? (
                        <Box sx={{ display: "flex", gap: 0 }}>
                          {column.actions.map((action, idx) => {
                            let icon;
                            let handler;
                            switch (action.type) {
                              case "edit":
                                icon = (
                                  <EditIcon
                                    style={{
                                      color: theme.palette.primary.main,
                                    }}
                                  />
                                );
                                handler = handleEdit(value.id); // Store the function reference
                                break;
                              case "delete":
                                icon = (
                                  <DeleteIcon
                                    style={{
                                      color: theme.palette.primary.main,
                                    }}
                                  />
                                );
                                handler = handleDelete(value.id); // Store the function reference
                                break;
                              case "custom":
                                icon = action.icon; // Use the custom icon
                                handler = action.handler;
                                break;
                              case "visibility":
                                icon = (
                                  <VisibilityIcon
                                    style={{
                                      color: theme.palette.primary.main,
                                    }}
                                  />
                                );
                                handler = action.handler;
                                break;
                              default:
                                return null;
                            }

                            return (
                              <IconButton key={idx} onClick={() => handler}> {/* Wrap handler in a function */}
      {icon}
    </IconButton>
                            );
                          })}
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
      {!hidePagination && filteredUsers.length > 0 && (
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
