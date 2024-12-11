import Drawer from '@mui/material/Drawer';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';

import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import ColorPicker from '@/components/widgets/colorPicker/colorPicker';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';





























const GSTCategoryData = [
{ value: 'category1', label: 'Category 1' },
{ value: 'category2', label: 'Category 2' }];


const colorset1 = [
{ color: '#ed9f9f', border: 'transparent' },
{ color: '#EDD79F', border: 'transparent' },
{ color: '#B3ED9F', border: 'transparent' },
{ color: '#9FE4ED', border: 'transparent' },
{ color: '#9FA7ED', border: 'transparent' },
{ color: '#E29FED', border: 'transparent' },
{ color: '#DBDBDB', border: 'transparent' }];


const colorset2 = [
{ color: '#000', border: 'transparent' },
{ color: '#fff', border: ' #B7B1B1' }];


const generateZodSchema = () => {
  return z.object({
    itemName: z.string().optional(),
    gstCategory: z.string().optional(),
    categoryOrder: z.string().optional(),
    serviceCharge: z.string().optional(),
    showImagePos: z.boolean().optional(),
    showImageWeb: z.boolean().optional()
  });
};

const AddCategory = ({
  open,
  onClose,
  formTitle,

  edit,
  setEdit
}) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      itemName: '',
      gstCategory: '',
      categoryOrder: '',
      serviceCharge: '',
      showImagePos: false,
      showImageWeb: false
    }
  });
  useEffect(() => {
    reset({
      itemName: edit?.itemName || ''
    });
  }, [edit, reset]);
  const onSubmit = () => {

    // eslint-disable-next-line no-console
  };const handleClose = () => {
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 }
      }}>

      <PageHeader title={formTitle} hideSearch={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout cardHeading={translate('new_category')}>
          <Controller
            control={control}
            name="itemName"
            render={({ field }) =>
            <GSTextInput
              {...field}
              label={translate('category_name')}
              helperText={errors.itemName?.message}
              error={Boolean(errors.itemName)}
              placeholder={translate('enter_category_name')} />

            } />


          <Controller
            name="gstCategory"
            control={control}
            render={({ field }) =>
            <GSSelectInput
              {...field}
              label={translate('gst')}
              options={GSTCategoryData}
              placeholder={translate('include_gst')}
              helperText={errors.gstCategory?.message}
              error={Boolean(errors.gstCategory)} />

            } />


          <Controller
            name="categoryOrder"
            control={control}
            render={({ field }) =>
            <GSSelectInput
              {...field}
              label={translate('category_order')}
              options={GSTCategoryData}
              placeholder={translate('category_order_on_pos')}
              helperText={errors.categoryOrder?.message}
              error={Boolean(errors.categoryOrder)} />

            } />


          <Controller
            name="serviceCharge"
            control={control}
            render={({ field }) =>
            <GSSelectInput
              {...field}
              label={translate('service_charge')}
              options={GSTCategoryData}
              placeholder={translate('include_service_charge')}
              helperText={errors.serviceCharge?.message}
              error={Boolean(errors.serviceCharge)} />

            } />


          <GSCustomStackLayout direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <ColorPicker heading={translate('category_background_color')} colors={colorset1} />
            <ColorPicker heading={translate('category_background_color')} colors={colorset2} />
          </GSCustomStackLayout>

          <GSCustomStackLayout direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <Controller
              name="showImagePos"
              control={control}
              render={({ field }) =>
              <GSSwitchButton
                {...field}
                label={translate('show_image_pos')}
                labelPlacement="start"
                sx={{
                  display: 'block',
                  marginTop: '20px !important',
                  marginLeft: 0
                }} />

              } />

            <Controller
              name="showImageWeb"
              control={control}
              render={({ field }) =>
              <GSSwitchButton
                {...field}
                label={translate('show_image_web')}
                labelPlacement="start"
                sx={{
                  display: 'block',
                  marginTop: '20px !important',
                  marginLeft: 0
                }} />

              } />

          </GSCustomStackLayout>
        </FormLayout>
        <Box display="flex" justifyContent="flex-end" mt={3} mb={5}>
          <CustomButton variant="outlined" type="button" sx={{ mr: 2 }} onClick={handleClose}>
            {translate('cancel')}
          </CustomButton>

          <CustomButton variant="contained" type="submit">
            {translate('save')}
          </CustomButton>
        </Box>
      </form>
    </Drawer>);

};

export default AddCategory;