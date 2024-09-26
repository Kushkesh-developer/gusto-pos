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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alpha, useTheme } from "@mui/material/styles";
import PaginationComponent from "./Pagination";

// Define types for actions
interface ActionType {
  type: "edit" | "delete" | "custom"| "Visibility";
  handler: () => void;
  icon?: React.ReactNode; // Only required for custom actions
}

interface ColumnType {
  label: string;
  key: string;
  visible: boolean;
  isAction?: boolean;
  actions?: ActionType[]; // Optional, but required for action columns
}

export type GSTableData = Record<string, unknown>[];

interface TableProps {
  columns: ColumnType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredUsers: any[]; // Array of user data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}: TableProps) => {
  const theme = useTheme();

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
                            switch (action.type) {
                              case "edit":
                                icon = (
                                  <EditIcon
                                    style={{
                                      color: theme.palette.primary.main,
                                    }}
                                  />

                                );
                                break;
                              case "delete":
                                icon = (
                                  <DeleteIcon
                                    style={{
                                      color: theme.palette.primary.main,
                                    }}
                                  />
                                );
                                break;
                              case "custom":
                                icon = action.icon; // Use the custom icon
                                break;

                              case "Visibility":
                                icon=(
                                <VisibilityIcon
                                   style={{
                                    color: theme.palette.primary.main,
                                   }}    
                                  />
                                );
                                break;
                              default:
                                return null;
                            }

                            return (
                              <IconButton key={idx} onClick={action.handler}>
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
