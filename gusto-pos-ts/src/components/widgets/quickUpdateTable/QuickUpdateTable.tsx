import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';

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

const QuickUpdateTable = ({ productData }: QuickUpdateTableProps) => {
  const [products, setProducts] = useState<ProductData[]>(productData);
  const { translate } = useLocalization();
  const handleFieldChange =
    (index: number, field: keyof ProductData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedProducts = [...products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: field === 'name' ? event.target.value : Number(event.target.value),
      };
      setProducts(updatedProducts);
    };

  return (
    <Paper elevation={3} sx={{ maxWidth: '100%', boxShadow: 0 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translate('name')}</TableCell>
              <TableCell>{translate('price')}</TableCell>
              <TableCell>{translate('special_price_1')}</TableCell>
              <TableCell>{translate('special_price_2')}</TableCell>
              <TableCell>{translate('special_price_3')}</TableCell>
              <TableCell>{translate('min_qty_for_special_price_1')}</TableCell>
              <TableCell>{translate('min_qty_for_special_price_2')}</TableCell>
              <TableCell>{translate('min_qty_for_special_price_3')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    value={product.name}
                    onChange={handleFieldChange(index, 'name')}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.price}
                    onChange={handleFieldChange(index, 'price')}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.specialPrice1}
                    onChange={handleFieldChange(index, 'specialPrice1')}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.specialPrice2}
                    onChange={handleFieldChange(index, 'specialPrice2')}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.specialPrice3}
                    onChange={handleFieldChange(index, 'specialPrice3')}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.minQty1}
                    onChange={handleFieldChange(index, 'minQty1')}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.minQty2}
                    onChange={handleFieldChange(index, 'minQty2')}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    value={product.minQty3}
                    onChange={handleFieldChange(index, 'minQty3')}
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
