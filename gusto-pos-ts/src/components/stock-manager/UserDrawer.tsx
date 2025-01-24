import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { TranslateFn } from '@/types/localization-types';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';
import { Button, Typography } from '@mui/material';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';

type UserDrawerProps = {
  open: boolean;
  onClose: () => void;
  onAddUser: (_user: FormData) => void;
};

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  status: string;
  creditPeriod: number;
  creditLimit: number;
  openingBalance: number;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    firstName: z.string().min(1, translate('first_name_required')),
    lastName: z.string().min(1, translate('last_name_required')),
    phoneNumber: z.string().min(1, translate('phone_number_required')),
    password: z.string().min(1, translate('password_required')),
    status: z.string().min(1, translate('status_is_required')),
    creditPeriod: z.preprocess(
      (val) => (val === '' || val == null ? undefined : Number(val)),
      z
        .number({ invalid_type_error: translate('credit_period_required') })
        .min(1, { message: translate('credit_period_required') }), 
    ),
    creditLimit: z.preprocess(
      (val) => (val === '' || val == null ? undefined : Number(val)),
      z
        .number({ invalid_type_error: translate('credit_limit_required') })
        .min(1, { message: translate('credit_limit_required') }), // Min set to 1
    ),
    openingBalance: z.preprocess(
      (val) => (val === '' || val == null ? undefined : Number(val)),
      z
        .number({ invalid_type_error: translate('opening_balance_required') })
        .min(1, { message: translate('opening_balance_required') }),
    ),
  });
};

export default function UserDrawer({ open, onClose, onAddUser }: UserDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      status: '',
      creditPeriod: 0,
      creditLimit: 0,
      openingBalance: 0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    onAddUser?.(data);
  };

  const statusList = [
    { label: 'Enabled', value: 'enable' },
    { label: 'Disabled', value: 'disabled' },
  ];

  const handleClose = (): void => {
    reset({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      status: '',
      creditPeriod: 0,
      creditLimit: 0,
      openingBalance: 0,
    });
    onClose();
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
      <Typography variant="h6"></Typography>
      <PageHeader title={translate('add_user')} hideSearch={true} onClose={handleClose} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <FormLayout cardHeading={translate('users')}>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  requiredMark
                  label={translate('first_name')}
                  helperText={errors.firstName?.message}
                  error={Boolean(errors.firstName)}
                  placeholder={translate('enter_first_name')}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  requiredMark
                  label={translate('last_name')}
                  helperText={errors.lastName?.message}
                  error={Boolean(errors.lastName)}
                  placeholder={translate('enter_last_name')}
                />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  requiredMark
                  label={translate('phone_number')}
                  helperText={errors.phoneNumber?.message}
                  error={Boolean(errors.phoneNumber)}
                  placeholder={translate('enter_phone_number')}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  requiredMark
                  label={translate('password')}
                  helperText={errors.password?.message}
                  error={Boolean(errors.password)}
                  placeholder={translate('enter_password')}
                />
              )}
            />
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  requiredMark
                  options={statusList}
                  label={translate('status')}
                  helperText={errors.status?.message}
                  error={Boolean(errors.status)}
                  placeholder={translate('select_status')}
                />
              )}
            />
            <Controller
              control={control}
              name="creditPeriod"
              render={({ field: fieldProps }) => (
                <GSNumberInput
                  {...fieldProps}
                  requiredMark
                  label={translate('credit_period')}
                  helperText={errors.creditPeriod?.message}
                  error={Boolean(errors.creditPeriod)}
                  value={fieldProps.value === 0 ? '' : String(fieldProps.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    fieldProps.onChange(value === '' ? 0 : parseFloat(value));
                  }}
                  placeholder={translate('enter_credit_period')}
                  startAdornment={'$'}
                />
              )}
            />
            <Controller
              control={control}
              name="creditLimit"
              render={({ field: fieldProps }) => (
                <GSNumberInput
                  {...fieldProps}
                  requiredMark
                  label={translate('credit_limit')}
                  helperText={errors.creditLimit?.message}
                  error={Boolean(errors.creditLimit)}
                  value={fieldProps.value === 0 ? '' : String(fieldProps.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    fieldProps.onChange(value === '' ? 0 : parseFloat(value));
                  }}
                  placeholder={translate('enter_credit_limit')}
                  endAdornment={'Day(s)'}
                />
              )}
            />
            <Controller
              control={control}
              name="openingBalance"
              render={({ field: fieldProps }) => (
                <GSNumberInput
                  {...fieldProps}
                  requiredMark
                  label={translate('opening_balance')}
                  helperText={errors.openingBalance?.message}
                  error={Boolean(errors.openingBalance)}
                  value={fieldProps.value === 0 ? '' : String(fieldProps.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    fieldProps.onChange(value === '' ? 0 : parseFloat(value));
                  }}
                  placeholder={translate('enter_opening_balance')}
                  endAdornment={'$'}
                />
              )}
            />
          </FormLayout>
          <Box sx={{ display: 'flex', minWidth: '100%', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={handleClose}>
              {translate('cancel')}
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
            >
              {translate('save')}
            </Button>
          </Box>
        </Box>
      </form>
    </Drawer>
  );
}
