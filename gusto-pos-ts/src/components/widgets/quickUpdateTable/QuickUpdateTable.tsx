import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

interface ProductData {
  name: string;
  price: number;
  specialPrice1: number;
  specialPrice2: number;
  specialPrice3: number;
  minQty1: number;
  minQty2: number;
  minQty3: number;
}

interface QuickUpdateTableProps {
  selectedCategory: string;
  productData: ProductData[];
}

const QuickUpdateTable: React.FC<QuickUpdateTableProps> = ({ productData }) => {
  return (
    <Paper elevation={3} sx={{ maxWidth: "100%", boxShadow: 0 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Special Price 1</TableCell>
              <TableCell>Special Price 2</TableCell>
              <TableCell>Special Price 3</TableCell>
              <TableCell>Min Qty For Special Price 1</TableCell>
              <TableCell>Min Qty For Special Price 2</TableCell>
              <TableCell>Min Qty For Special Price 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((product, index) => (
              <TableRow key={index}>
                <TableCell sx={{ height: "24px" }}>
                  <TextField
                    fullWidth
                    value={product.name}
                    variant="outlined"
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.price}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.specialPrice1}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.specialPrice2}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.specialPrice3}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.minQty1}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.minQty2}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.minQty3}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default QuickUpdateTable;
