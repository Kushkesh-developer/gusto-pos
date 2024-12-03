import Drawer from '@mui/material/Drawer';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import * as z from 'zod';

import { Box } from '@mui/material';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import GSCard from '@/components/widgets/cards/GSCard';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import PageHeader from '@/components/widgets/headers/PageHeader';

const generateZodSchema = (translate) => {
  return z.object({
    customerGroup: z.string().min(1, translate('customer_group_name_required')),
  });
};

const CustomerGroupForm = ({
  open,
  onClose,
  formTitle,

  edit,
  setEdit,
}) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customerGroup: '',
    },
  });
  useEffect(() => {
    console.log('hello', formTitle, edit?.username);

    reset({
      customerGroup:
        formTitle === translate('edit_customer_group') ? (edit?.customerGroup ?? '') : '',
      // gender: edit?.gender || 'Male',
    });
  }, [edit, reset]);
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  const handleClose = () => {
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <GSCard heading="Customer Group">
          <Box sx={{ padding: 3 }}>
            <Controller
              control={control}
              name="customerGroup"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  {...register('customerGroup')}
                  label={translate('customer_group_name')}
                  helperText={errors.customerGroup?.message}
                  error={Boolean(errors.customerGroup)}
                  placeholder={translate('enter_customer_group_name')}
                  width="350px"
                />
              )}
            />
          </Box>
        </GSCard>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <CustomButton variant="outlined" type="button" sx={{ mr: 2 }} onClick={handleClose}>
            {translate('cancel')}
          </CustomButton>

          <CustomButton variant="contained" type="submit">
            {translate('save')}
          </CustomButton>
        </Box>
      </form>
    </Drawer>
  );
};

export default CustomerGroupForm;
