import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import { z } from 'zod';
import FormGroup from '@mui/material/FormGroup';
import { TranslateFn } from '@/types/localization-types';
import { FormControlLabel, Button } from '@mui/material';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
type EditType = {
  username?: string;
  id?: string | number;
  email?: string;
  [key: string]: unknown;
  group: string;
  name?: string;
  printerName?: string;
};
type PrinterDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};
interface FormData {
  printerName: string;
  printerType: string;
  printerModel: string;
  printerIPAddress: string;
  receiptQuantity: string;
  details: {
    printReceiptAndbills: boolean;
    printOrders: boolean;
  };
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    printerName: z.string().min(1, translate('printer_name_is_required')),
    printerType: z.string().min(1, translate('printer_type_is_required')),
    printerModel: z.string().min(1, translate('print_model_is_required')),
    printerIPAddress: z.string().min(1, translate('print_ip_is_required')),
    receiptQuantity: z.string().min(1, translate('recipe_quantity_is_required')),
    details: z.record(z.boolean()),
  });
};

export default function PrinterDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit,
}: PrinterDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      printerName: edit?.printerName || '',
      printerType: '',
      printerModel: '',
      printerIPAddress: '',
      receiptQuantity: '',
      details: {
        printReceiptAndbills: false,
        printOrders: false,
      },
    },
  });
  useEffect(() => {
    reset({
      printerName: edit?.printerName || '',
      // gender: edit?.gender || 'Male',
    });
  }, [edit, reset]);
  const handleClose = () => {
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  const onSubmit: SubmitHandler<FormData | EditType> = () => {};
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('printer_details')}>
          <Controller
            control={control}
            name="printerName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                {...register('printerName')}
                label={translate('printer_name')}
                helperText={errors.printerName?.message}
                error={Boolean(errors.printerName)}
                placeholder={translate('printer_name')}
              />
            )}
          />
          <Controller
            control={control}
            name="printerType"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('printer_type')}
                helperText={errors.printerType?.message}
                error={Boolean(errors.printerType)}
                placeholder={translate('printer_type')}
              />
            )}
          />
          <Controller
            control={control}
            name="printerModel"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('printer_model')}
                helperText={errors.printerModel?.message}
                error={Boolean(errors.printerModel)}
                placeholder={translate('printer_model')}
              />
            )}
          />
          <Controller
            control={control}
            name="printerIPAddress"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('printer_ip_address')}
                helperText={errors.printerIPAddress?.message}
                error={Boolean(errors.printerIPAddress)}
                placeholder={translate('printer_ip_address')}
              />
            )}
          />
          <Controller
            control={control}
            name="receiptQuantity"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('receipt_quantity')}
                helperText={errors.receiptQuantity?.message}
                error={Boolean(errors.receiptQuantity)}
                placeholder={translate('receipt_quantity')}
              />
            )}
          />
          <GSCustomStackLayout withoutGrid>
            <Controller
              name="details.printReceiptAndbills"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label={translate('print_recipe_and_bills')}
                  />
                </FormGroup>
              )}
            />
            <Controller
              name="details.printOrders"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label={translate('print_orders')}
                  />
                </FormGroup>
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
