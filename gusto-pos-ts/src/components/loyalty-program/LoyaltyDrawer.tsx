'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { TranslateFn } from '@/types/localization-types';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import { useDrawerContext } from '@/context/DrawerProvider';
import GSSwitchButton from '../widgets/switch/GSSwitchButton';

interface FormData {
  id?: string | number;
  membership_name: string;
  minimum_point_to_redeem: string;
  expiry_period: string;
  unlock_accumulated: string;
  maximum_point: string;
  $1_spent_equal_to: string;
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
  // name?: string;
  // phone?: string;
  // email?: string;
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
    { name: 'membership_name' as keyof FormData, labelKey: 'membership_name' },
    { name: 'minimum_point_to_redeem' as keyof FormData, labelKey: 'minimum_point_to_redeem' },
    { name: 'expiry_period' as keyof FormData, labelKey: 'expiry_period' },
    { name: 'maximum_point' as keyof FormData, labelKey: 'maximum_point' },
    { name: '$1_spent_equal_to' as keyof FormData, labelKey: '$1_spent_equal_to' },
    { name: 'unlock_accumulated' as keyof FormData, labelKey: 'unlock_accumulated' },
  ],
};

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    membership_name: z.string().min(1, { message: translate('membership_name_required') }),
    minimum_point_to_redeem: z
      .number()
      .min(1, { message: translate('minimum_point_to_redeem_required') }),
    expiry_period: z.string().min(1, { message: translate('expiry_period_required') }),
    unlock_accumulated: z.string().min(1, { message: translate('unlock_accumulated_required') }),
    maximum_point: z.number().min(1, { message: translate('maximum_point_required') }),
    $1_spent_equal_to: z.string().min(1, { message: translate('$1_spent_equal_to_required') }),
  });
};

function LoyaltyDrawer({ open, onClose, formTitle, edit, setEdit }: EditFormProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      membership_name: '',
      minimum_point_to_redeem: '',
      expiry_period: '',
      unlock_accumulated: '',
      maximum_point: '',
      $1_spent_equal_to: '',
    },
  });

  // Populate the form when editData changes
  useEffect(() => {
    if (edit) {
      // Populate form fields with the edit record data
      reset({
        membership_name: edit.membership_name || '',
        minimum_point_to_redeem: edit.minimum_point_to_redeem || '',
        expiry_period: edit.expiry_period || '',
        unlock_accumulated: edit.unlock_accumulated || '',
        maximum_point: edit.maximum_point || '',
        $1_spent_equal_to: edit.$1_spent_equal_to || '',
      });
    } else {
      // Reset form to blank values for Add mode
      reset({
        membership_name: '',
        minimum_point_to_redeem: '',
        expiry_period: '',
        unlock_accumulated: '',
        maximum_point: '',
        $1_spent_equal_to: '',
      });
    }
  }, [edit, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
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
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} />
      <Box mb={5}>
        <FormLayout cardHeading={translate(singleTierConfig.tier)}>
          {singleTierConfig.fields.map(({ name, labelKey }) => (
            <>
              {name !== 'unlock_accumulated' ? (
                // Render GSTextInput for all other fields
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <GSTextInput
                      {...field}
                      label={translate(labelKey)}
                      error={Boolean(errors[name]?.message)}
                      helperText={errors[name]?.message}
                      placeholder={translate(labelKey)}
                    />
                  )}
                />
              ) : (
                // Render GSSwitchButton for "unlock_accumulated"
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <GSSwitchButton
                      {...field}
                      label={translate(labelKey)}
                      labelPlacement="start"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column-reverse', // Ensures the label and switch are in a row
                        alignItems: 'flex-start', // Aligns items to the start
                        justifyContent: 'flex-start', // Aligns content to the start
                        marginTop: '3px', // Adjust vertical spacing
                        marginLeft: 0, // Align to the left
                      }}
                    />
                  )}
                />
              )}
            </>
          ))}
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

export default LoyaltyDrawer;
