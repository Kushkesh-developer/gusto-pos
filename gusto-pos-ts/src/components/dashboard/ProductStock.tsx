import { useLocalization } from '@/context/LocalizationProvider';
import {
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

export type ProductStock = {
  id?: number;
  product: string;
  location: string;
  quantity: string;
};

type ProductStockProps = {
  productStockData: ProductStock[];
};

function StockRow({
  product,
  location,
  quantity,
  isHeading,
}: ProductStock & { isHeading?: boolean }) {
  const sx = isHeading ? { fontWeight: '500', color: 'text.secondary', fontSize: 16 } : {};
  return (
    <Stack direction={'row'} alignItems={'center'} mt={1} flex={1} mb={isHeading ? 1 : 0}>
      <Typography variant="body2" flex={1} sx={sx}>
        {product}
      </Typography>
      <Typography variant="body2" flex={1} sx={sx}>
        {location}
      </Typography>
      <Typography variant="body2" flex={1} textAlign={'end'} sx={sx}>
        {quantity}
      </Typography>
    </Stack>
  );
}

export function ProductStockAlert({ productStockData }: ProductStockProps) {
  const { translate } = useLocalization();
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const theme = useTheme();
  // Handler for Purchase button click
  const handlePurchaseClicked = () => {
    setOpenPurchaseDialog(true); // Open confirmation dialog
  };

  // Handler for Transfer button click
  const handleTransferClicked = () => {
    setOpenTransferDialog(true); // Open confirmation dialog
  };

  // Confirm Purchase action
  const handleConfirmPurchase = () => {
    console.log('Confirmed purchase!');
    setOpenPurchaseDialog(false); // Close dialog
  };

  // Confirm Transfer action
  const handleConfirmTransfer = () => {
    console.log('Confirmed transfer!');
    setOpenTransferDialog(false); // Close dialog
  };

  return (
    <Paper sx={{ mt: 2, p: 3, flex: 1, height: 'fit-content' }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography flex={1}>{translate('product_stock_alert')}</Typography>
        <Button
          sx={{ mr: 2 }}
          variant="contained"
          onClick={handlePurchaseClicked} // Add click handler for purchase
        >
          {translate('purchase')}
        </Button>
        <Button
          variant="contained"
          onClick={handleTransferClicked} // Add click handler for transfer
        >
          {translate('transfer')}
        </Button>
      </Stack>
      <Divider variant="fullWidth" sx={{ my: 1 }} />
      <Stack sx={{ flex: 1, mt: 1 }}>
        <StockRow
          product={translate('product')}
          location={translate('location')}
          quantity={translate('quantity')}
          isHeading
        />
        {productStockData.map(({ id, product, location, quantity }, index) => {
          return (
            <StockRow
              id={id}
              key={index}
              product={product}
              location={location}
              quantity={quantity}
            />
          );
        })}
      </Stack>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={openPurchaseDialog} onClose={() => setOpenPurchaseDialog(false)}>
        <DialogTitle>{translate('confirm_purchase')}</DialogTitle>
        <DialogContent>
          <DialogContentText color={theme.palette.text.primary} fontSize={14}>
            {translate('are_you_sure_purchase')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPurchaseDialog(false)} color="primary">
            {translate('cancel')}
          </Button>
          <Button onClick={handleConfirmPurchase} color="primary">
            {translate('confirm')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Confirmation Dialog */}
      <Dialog open={openTransferDialog} onClose={() => setOpenTransferDialog(false)}>
        <DialogTitle>{translate('confirm_transfer')}</DialogTitle>
        <DialogContent>
          <DialogContentText color={theme.palette.text.primary} fontSize={14}>
            {translate('are_you_sure_transfer')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTransferDialog(false)} color="primary">
            {translate('cancel')}
          </Button>
          <Button onClick={handleConfirmTransfer} color="primary">
            {translate('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
