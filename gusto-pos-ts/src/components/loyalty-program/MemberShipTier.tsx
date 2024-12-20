'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { TranslateFn } from '@/types/localization-types';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import { useDrawerContext } from '@/context/DrawerProvider';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';

interface FormData {
  id?: string | number;
  membership_name: string;
  minimum_point_to_redeem: number;
  expiry_period: string;
  unlock_accumulated: string;
  maximum_point: number;
  $1_spent_equal_to: number;
}

type EditType = {
  id?: string | number;
  membership_name: string;
  minimum_point_to_redeem: string;
  expiry_period: string;
  unlock_accumulated: string;
  maximum_point: string;
  $1_spent_equal_to: string;
  [key: string]: unknown;
};

interface EditFormProps {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode: boolean;
  edit?: EditType | null;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
}

const singleTierConfig = {
  tier: 'membership_tier',
  fields: [
    { name: 'membership_name' as keyof FormData, labelKey: 'membership_name', type: 'text' },
    {
      name: 'minimum_point_to_redeem' as keyof FormData,
      labelKey: 'minimum_point_to_redeem',
      type: 'number',
    },
    { name: 'expiry_period' as keyof FormData, labelKey: 'expiry_period', type: 'text' },
    { name: 'maximum_point' as keyof FormData, labelKey: 'maximum_point', type: 'number' },
    { name: '$1_spent_equal_to' as keyof FormData, labelKey: '$1_spent_equal_to', type: 'number' },
    {
      name: 'unlock_accumulated' as keyof FormData,
      labelKey: 'unlock_accumulated',
      type: 'switch',
    },
  ],
};

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    membership_name: z.string().min(1, { message: translate('membership_name_required') }),
    minimum_point_to_redeem: z
      .string({ required_error: translate('minimum_point_to_redeem_required') })
      .min(1, { message: translate('minimum_point_to_redeem_required') }),
    expiry_period: z.string().min(1, { message: translate('expiry_period_required') }),
    unlock_accumulated: z.string().min(1, { message: translate('unlock_accumulated_required') }),
    maximum_point: z
      .string({ required_error: translate('maximum_point_required') })
      .min(1, { message: translate('maximum_point_required') }),
    $1_spent_equal_to: z
      .string({ required_error: translate('$1_spent_equal_to_required') })
      .min(1, { message: translate('$1_spent_equal_to_required') }),
  });
};

function MemberShipTier({ open, onClose, formTitle, edit, setEdit }: EditFormProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    membership_name: '',
    minimum_point_to_redeem: 0,
    expiry_period: '',
    unlock_accumulated: '',
    maximum_point: 0,
    $1_spent_equal_to: 0,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (edit) {
      reset({
        membership_name: edit.membership_name || '',
        minimum_point_to_redeem: Number(edit.minimum_point_to_redeem) || 0,
        expiry_period: edit.expiry_period || '',
        unlock_accumulated: edit.unlock_accumulated || '',
        maximum_point: Number(edit.maximum_point) || 0,
        $1_spent_equal_to: Number(edit.$1_spent_equal_to) || 0,
      });
    } else {
      reset(defaultValues);
    }
  }, [edit, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const handleClose = (): void => {
    reset(defaultValues);
    setEdit(null);
    onClose();
  };

  const renderField = (field: { name: keyof FormData; labelKey: string; type: string }) => {
    if (field.type === 'switch') {
      return (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: fieldProps }) => (
            <GSSwitchButton
              {...fieldProps}
              label={translate(field.labelKey)}
              labelPlacement="start"
              sx={{
                display: 'flex',
                flexDirection: 'column-reverse',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: '3px',
                marginLeft: 0,
              }}
            />
          )}
        />
      );
    } else if (field.type === 'number') {
      return (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: fieldProps }) => (
            <GSNumberInput
              {...fieldProps}
              requiredMark
              label={translate(field.labelKey)}
              helperText={errors[field.name]?.message}
              error={Boolean(errors[field.name])}
              placeholder={translate(field.labelKey)}
              endAdornment={field.name === '$1_spent_equal_to' ? '$' : 'Points'}
            />
          )}
        />
      );
    } else {
      return (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: fieldProps }) => (
            <GSTextInput
              {...fieldProps}
              requiredMark
              label={translate(field.labelKey)}
              error={Boolean(errors[field.name]?.message)}
              helperText={errors[field.name]?.message}
              placeholder={translate(field.labelKey)}
            />
          )}
        />
      );
    }
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
      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} />
      <Box mb={5}>
        <FormLayout cardHeading={translate(singleTierConfig.tier)}>
          {singleTierConfig.fields.map((field) => renderField(field))}
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

export default MemberShipTier;
