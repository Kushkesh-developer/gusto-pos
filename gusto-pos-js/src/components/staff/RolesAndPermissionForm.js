'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import * as z from 'zod';

import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSCard from '@/components/widgets/cards/GSCard';
import Box from '@mui/material/Box';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import { Divider, Stack, Switch, Typography, Checkbox, Card, CardContent } from '@mui/material';

const generateZodSchema = () => {
  return z.object({
    roleName: z.string().min(1, 'Roles name is required'),
  });
};

const SettingsData = [
  { label: 'View all receipts' },
  { label: 'Apply discounts with restricted access' },
  { label: 'Change taxes in a sale' },
  { label: 'Perform refunds' },
  { label: 'Manage all open tickets' },
  { label: 'Void tickets' },
  { label: 'View shift report' },
  { label: 'Open cash drawer without making a sale' },
  { label: 'Reprint and resend receipts' },
  { label: 'Manage items' },
];

const BackOfficeData = [
  { label: 'View sale reports' },
  { label: 'Cancel receipts' },
  { label: 'Items' },
  { label: 'Manage employees' },
  { label: 'Manage customers' },
  { label: 'Edit general settings' },
  { label: 'Manage billing' },
  { label: 'Manage payment types' },
  { label: 'Manage loyalty programme' },
  { label: 'Manage taxes' },
  { label: 'Manage kitchen printers' },
  { label: 'Manage dinning program' },
  { label: 'Manage POS devices' },
];

const RolesAndPermissionForm = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      roleName: '',
    },
  });

  const onSubmit = (data) => {
    const { roleName } = data;
    // eslint-disable-next-line no-console
    console.log('Role Name:', roleName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GSCard heading="Roles">
        <Box sx={{ padding: 3 }}>
          <Controller
            control={control}
            name="roleName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('role_name')}
                helperText={errors.roleName?.message}
                error={Boolean(errors.roleName)}
                placeholder={translate('enter_role_name')}
                width="350px"
              />
            )}
          />
        </Box>
      </GSCard>
      <GSCard heading="Permission">
        <Stack sx={{ p: 3 }} spacing={4}>
          <GSSwitchCard heading="POS" checkboxData={SettingsData} />
          <GSSwitchCard heading="Back Office" checkboxData={BackOfficeData} />
        </Stack>
      </GSCard>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
          {translate('cancel')}
        </CustomButton>
        <CustomButton variant="contained" type="submit">
          {translate('save')}
        </CustomButton>
      </Box>
    </form>
  );
};

export default RolesAndPermissionForm;

const GSSwitchCard = ({ heading, checkboxData }) => {
  const [enabled, setEnabled] = useState(false);
  const [checked, setChecked] = useState(new Array(checkboxData.length).fill(false));

  const handleToggle = (event) => {
    const isEnabled = event.target.checked;
    setEnabled(isEnabled);
    setChecked(new Array(checkboxData.length).fill(isEnabled)); // Set all checkboxes to true or false based on switch
  };

  const handleCheckboxChange = (index) => (event) => {
    const newChecked = [...checked];
    newChecked[index] = event.target.checked;
    setChecked(newChecked);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        '& .MuiCardContent-root': {
          padding: 0,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={1}>
          <Typography variant="h6">{heading}</Typography>
          <Switch checked={enabled} onChange={handleToggle} />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ px: 3, py: 1 }}>
          {checkboxData.map((data, index) => (
            <Stack key={index} direction="row" alignItems="center" justifyContent="space-between">
              <Typography>{data.label}</Typography>
              <Checkbox checked={checked[index]} onChange={handleCheckboxChange(index)} />
            </Stack>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
