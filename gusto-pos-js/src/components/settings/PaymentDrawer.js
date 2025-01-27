import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';

import { Button } from '@mui/material';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
import { useEffect } from 'react';

const generateZodSchema = () => {
  return z.object({
    status1: z.boolean(),
    payStatus: z.boolean(),
    payU: z.boolean(),
    credit_debit: z.boolean(),
  });
};

export default function PaymentDrawer({
  open,
  onClose,
  edit,
  formTitle,
  setEdit,
  setFilteredColumns,
}) {
  const { translate } = useLocalization();
  const schema = generateZodSchema();
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    status1: false,
    payStatus: false,
    credit_debit: false,
    payU: false,
  };

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  console.log('Edit Mode - Setting form values:', edit);
  useEffect(() => {
    console.log('Current edit object:', edit);

    if (edit && Object.keys(edit).length > 0) {
      const mappedValues = {
        status1: edit.status1 ?? false,
        payStatus: edit.payStatus ?? false,
        credit_debit: edit.credit_debit ?? false,
        payU: edit.payU ?? false,
      };

      console.log('Mapped values for reset:', mappedValues);
      reset(mappedValues);
    } else {
      console.log('Resetting to default values.');
      reset({
        status1: false,
        payStatus: false,
        credit_debit: false,
        payU: false,
      });
    }
  }, [edit, reset]);

  // In PaymentDrawer.tsx
  // In PaymentDrawer.tsx
  // In PaymentDrawer.tsx
  const onSubmit = (data) => {
    if (setFilteredColumns) {
      if (edit) {
        // Handle edit mode
        setFilteredColumns((currentRecords) => {
          const updatedRecords = currentRecords.map((record) => {
            if (record.id === edit.id) {
              return {
                ...record,
                credit_debit:
                  record.paymentType === 'Credit / Debit Cards'
                    ? data.credit_debit
                    : record.credit_debit,
                status1: record.paymentType === 'Alipay' ? data.status1 : record.status1,
                payStatus: record.paymentType === 'Paypal' ? data.payStatus : record.payStatus,
                payU: record.paymentType === 'PayU' ? data.payU : record.payU,
              };
            }
            return record;
          });

          return updatedRecords.filter((record) => {
            if (record.id === edit.id) {
              switch (record.paymentType) {
                case 'Credit / Debit Cards':
                  return record.credit_debit !== false;
                case 'Alipay':
                  return record.status1 !== false;
                case 'Paypal':
                  return record.payStatus !== false;
                case 'PayU':
                  return record.payU !== false;
                default:
                  return true;
              }
            }
            return true;
          });
        });
      } else {
        // Handle add mode
        setFilteredColumns((currentRecords) => {
          const newRecords = [];

          // Add Credit/Debit if enabled
          if (data.credit_debit) {
            const existingCreditDebit = currentRecords.find(
              (r) => r.paymentType === 'Credit / Debit Cards',
            );
            if (!existingCreditDebit) {
              newRecords.push({
                id: Date.now() + 1,
                paymentType: 'Credit / Debit Cards',
                provider: 'Bank',
                credit_debit: true,
              });
            }
          }

          // Add Alipay if enabled
          if (data.status1) {
            const existingAlipay = currentRecords.find((r) => r.paymentType === 'Alipay');
            if (!existingAlipay) {
              newRecords.push({
                id: Date.now() + 2,
                paymentType: 'Alipay',
                provider: 'Alipay',
                status1: true,
              });
            }
          }

          // Add PayPal if enabled
          if (data.payStatus) {
            const existingPaypal = currentRecords.find((r) => r.paymentType === 'Paypal');
            if (!existingPaypal) {
              newRecords.push({
                id: Date.now() + 3,
                paymentType: 'Paypal',
                provider: 'PayPal',
                payStatus: true,
              });
            }
          }

          // Add PayU if enabled
          if (data.payU) {
            const existingPayU = currentRecords.find((r) => r.paymentType === 'PayU');
            if (!existingPayU) {
              newRecords.push({
                id: Date.now() + 4,
                paymentType: 'PayU',
                provider: 'PayU',
                payU: true,
              });
            }
          }

          return [...currentRecords, ...newRecords];
        });
      }
    }

    handleClose();
  };

  const handleClose = () => {
    console.log('close');

    reset({
      status1: false,
      payStatus: false,
      credit_debit: false,
    });
    setEdit(null);
    onClose();
  };
  const handleDrawerClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    handleClose();
  };
  return (
    <Drawer
      open={open}
      onClose={handleDrawerClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2,
        },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('available_payment_types')}>
          <GSCustomStackLayout direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <Controller
              name="credit_debit"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    const target = e.target;
                    field.onChange(target.checked);
                  }}
                  label={translate('credit_debit_cards')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
              )}
            />

            <Controller
              name="status1"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    const target = e.target;
                    field.onChange(target.checked);
                  }}
                  label={translate('alipay')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
              )}
            />

            <Controller
              name="payStatus"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    const target = e.target;
                    field.onChange(target.checked);
                  }}
                  label={translate('paypal')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
              )}
            />

            <Controller
              name="payU"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    const target = e.target;
                    field.onChange(target.checked);
                  }}
                  label={translate('payU')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
              )}
            />
          </GSCustomStackLayout>
        </FormLayout>
      </Box>
      <Box
        sx={{
          display: 'flex',
          minWidth: '100%',
          justifyContent: 'flex-end',
          mt: 2,
        }}
      >
        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={handleClose}>
          {translate('cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          {translate('save')}
        </Button>
      </Box>
    </Drawer>
  );
}
