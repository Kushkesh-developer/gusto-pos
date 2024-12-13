'use client';

import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import Drawer from '@mui/material/Drawer';
import { TranslateFn } from '@/types/localization-types';
import { UserRecord } from '@/types/table-types';
import GSSwitchButton from '../widgets/switch/GSSwitchButton';

interface PaymentData {
  id?: string | number;
  currencyName: string;
  currency: string;
  icon: string;
  status1: boolean;
}
type EditType = {
  id?: string | number;
  currencyName: string;
  currency: string;
  icon: string;
  status1: boolean;
  [key: string]: unknown;
  name?: string;
  phone?: string;
  email?: string;
};
interface CurrencyDrawerProps {
  open: boolean;
  initialData: UserRecord | null;
  onClose: () => void;
  formTitle: string;
  edit?: EditType | null;
  editMode: boolean;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    currencyName: z.string().min(1, { message: translate('currency_name_required') }),
    currency: z.string().min(1, { message: translate('currency_required') }),
    icon: z.string().min(1, { message: translate('icon_required') }),
    status1: z.boolean(),
  });
};

function CurrencyDrawer({ open, onClose, formTitle, edit, setEdit }: CurrencyDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currencyName: '',
      currency: '',
      icon: '',
      status1: false,
    },
  });

  // Populate the form when editData changes
  useEffect(() => {
    if (edit) {
      reset({
        currencyName: edit.currencyName || '',
        currency: edit.currency || '',
        icon: edit.icon || '',
        status1: edit.status1 || false,
      });
    } else {
      reset({
        currencyName: '',
        currency: '',
        icon: '',
        status1: false,
      });
    }
  }, [edit, reset]);

  const onSubmit: SubmitHandler<PaymentData> = (data) => {
    // Handle form submission, including the outlets data
    console.log(data);
  };

  const handleClose = (): void => {
    setEdit(null);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} />
      <Box mb={5}>
        <FormLayout cardHeading={formTitle}>
          <Controller
            name="currencyName"
            control={control}
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('currency_name')}
                error={Boolean(errors.currencyName?.message)}
                helperText={errors.currencyName?.message}
                placeholder={translate('currency_name')}
              />
            )}
          />
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('currency')}
                error={Boolean(errors.currency?.message)}
                helperText={errors.currency?.message}
                placeholder={translate('currency')}
              />
            )}
          />
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('icon')}
                error={Boolean(errors.icon?.message)}
                helperText={errors.icon?.message}
                placeholder={translate('icon')}
              />
            )}
          />
          <Controller
            name="status1"
            control={control}
            render={({ field }) => (
              <GSSwitchButton
                {...field}
                label={translate('status')}
                labelPlacement="start"
                sx={{
                  display: 'block',
                  marginTop: '20px !important',
                  marginLeft: 0,
                }}
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

export default CurrencyDrawer;
