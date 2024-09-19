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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha, SxProps, useTheme } from "@mui/material/styles";
import PaginationComponent from "./Pagination";

export interface ColumnType {
  label: string;
  key: string;
  visible: boolean;
  isAction?: boolean;
}

export type GSTableData = Record<string, unknown>[];

interface TableProps {
  columns: ColumnType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredUsers: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentItems: any[];
  currentPage: number;
  totalPages: number;
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
  handlePageChange = () => {},
  sx = {},
}: TableProps) => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper} sx={{ pb: 2, ...sx }}>
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
                      {column.isAction ? (
                        <Box sx={{ display: "flex", gap: 0 }}>
                          <IconButton onClick={() => console.log("edit")}>
                            <EditIcon
                              style={{ color: theme.palette.primary.main }}
                            />
                          </IconButton>
                          <IconButton onClick={() => console.log("Delete")}>
                            <DeleteIcon
                              style={{ color: theme.palette.primary.main }}
                            />
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
