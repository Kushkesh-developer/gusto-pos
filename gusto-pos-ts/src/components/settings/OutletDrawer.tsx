import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { TranslateFn } from '@/types/localization-types';
import { Button } from '@mui/material';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';
import { useDrawerContext } from '@/context/DrawerProvider';
type EditType = {
  address?: string;
  postal?: string;
  id?: string | number;
  email?: string;
  [key: string]: unknown;
  group: string;
  name?: string;
};
type OutletDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};
interface FormData {
  name: string;
  printerName: string;
  address: string;
  postal: string;
  printerType: string;
  receiptQuantity: string;
  printReceiptAndBills: boolean;
  printOrders: boolean;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    name: z.string().min(1, translate('name_is_required')),
    address: z.string().min(1, translate('address_is_required')),
    postal: z.string().min(1, translate('postal_is_required')),
  });
};

export default function OutletDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit,
}: OutletDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.name || '',
      printerName: '',
      address: '',
      postal: '',
      printerType: '',
      receiptQuantity: '',
      printReceiptAndBills: false,
      printOrders: false,
    },
  });
  useEffect(() => {
    reset({
      name: edit?.name || '',
      address: edit?.address || '',
      postal: edit?.postal || '',
    });
  }, [edit, reset]);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  const handleClose = () => {
    reset({
      name: edit?.name || '',
      address: edit?.address || '',
      postal: edit?.postal || '',
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2,
        },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} showMobileView />
      <Box mb={5}>
        <FormLayout cardHeading={translate('outlet_details')}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('name')}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
                placeholder={translate('name')}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('address')}
                helperText={errors.address?.message}
                error={Boolean(errors.address)}
                placeholder={translate('address')}
              />
            )}
          />
          <Controller
            name="postal"
            control={control}
            render={({ field }) => (
              <GSNumberInput
                {...field}
                requiredMark
                label={translate('postal')}
                placeholder={translate('postal')}
                helperText={errors.postal?.message}
                error={Boolean(errors.postal)}
                startAdornment={'L£'}
              />
            )}
          />
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
