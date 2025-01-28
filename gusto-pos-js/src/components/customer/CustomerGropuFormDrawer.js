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

import { useDrawerContext } from '@/context/DrawerProvider';

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
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    customerGroup: '',
  };
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  useEffect(() => {
    reset({
      customerGroup: edit?.customerGroup ?? '',
    });
  }, [edit, open, reset]);
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  const handleClose = () => {
    reset({
      ...defaultValues,
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <GSCard heading={translate('customer_group')}>
          <Box sx={{ padding: 3 }}>
            <Controller
              control={control}
              name="customerGroup"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  requiredMark
                  {...register('customerGroup')}
                  label={translate('customer_group_name')}
                  helperText={errors.customerGroup?.message}
                  error={Boolean(errors.customerGroup)}
                  placeholder={translate('enter_customer_group_name')}
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
