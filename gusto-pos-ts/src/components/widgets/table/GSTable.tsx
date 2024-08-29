import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Box, Pagination, TableContainer, Paper } from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { theme } from "@/theme/theme";
import {  alpha } from '@mui/material/styles';

interface TableProps {
  columnNames: string[];
  columnVisibility: { [key: string]: boolean };
  filteredUsers: any[];
  currentItems: any[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  keyMapping: { [key: string]: string };
  visibility?: boolean;
}

const GSTable: React.FC<TableProps> = ({
  columnNames,
  columnVisibility,
  filteredUsers,
  currentItems,
  currentPage,
  totalPages,
  handlePageChange,
  keyMapping,
  visibility,
}) => {
  console.log(columnNames, columnVisibility,keyMapping, "columnNames");
  console.log("Current Items:", currentItems);
  return (
    <TableContainer component={Paper} style={{paddingBottom:"10px"}}>
      <Table>
        <TableHead style={{backgroundColor: alpha(theme.palette.primary.main, 0.10),fontSize:"20px",fontWeight:"bold"}}>
          <TableRow>
            {columnNames.map((name) =>
              columnVisibility[name] ? (
                <TableCell key={name}>{name}</TableCell>
              ) : null
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnNames.length} align="center">
                Record Not Found
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((value) => (
              <TableRow key={value.id}>
                {columnNames.map((column) =>
                  columnVisibility[column] ? (
                    <TableCell key={column}>
                      {column === "Action" ? (
                        <Box sx={{ display: 'flex', gap: 0 }}>
                          <IconButton component={Link} href={`/attendance/${value.id}`}>
                            <EditIcon style={{ color: theme.palette.primary.main}} />
                          </IconButton>
                          <IconButton component={Link} href={`/attendance/${value.id}`}>
                            <DeleteIcon  style={{ color: theme.palette.primary.main}}/>
                          </IconButton>
                        </Box>
                      ) : (
                        <span>{value[keyMapping[column]]}</span>
                      )}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {filteredUsers.length > 0 && (
        <Pagination
          sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      )}
    </TableContainer>
  );
};

export default GSTable;
