import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';

import { Button } from '@mui/material';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';

import PageHeader from '@/components/widgets/headers/PageHeader';
<<<<<<< HEAD
=======
import { useDrawerContext } from '@/context/DrawerProvider';
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea

const generateZodSchema = (translate) => {
  return z.object({
    receiptName: z
      .string({ required_error: translate('receipt_name_is_required') })
      .min(1, translate('receipt_name_is_required')),
    header: z
      .string({ required_error: translate('header_text_is_must') })
      .min(1, translate('header_text_is_must')),
    footer: z
      .string({ required_error: translate('footer_text_is_required') })
      .min(1, translate('footer_text_is_required')),
    showCustomerInfo: z.string().optional(),
    ShowComments: z.string().optional(),
    printOrders: z.boolean().optional(),
  });
};
<<<<<<< HEAD

=======
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
export default function ReceiptDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedImg, setSelectedImg] = useState(undefined);
  const { drawerPosition } = useDrawerContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      receiptName: '',
      header: '',
      footer: '',
      showCustomerInfo: false,
      ShowComments: false,
      printOrders: false,
    },
  });
  useEffect(() => {
<<<<<<< HEAD
    if (edit) {
      reset({
        receiptName: edit?.receiptName || '',
      });
    } else {
      reset({
        receiptName: '',
        header: '',
        footer: '',
        showCustomerInfo: false,
        ShowComments: false,
        printOrders: false,
      });
    }
=======
    reset({
      receiptName: edit?.receiptName || '',
      // gender: edit?.gender || 'Male',
    });
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
  }, [edit, reset]);
  console.log('errors=>', errors);
  const onSubmit = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
        setSelectedImg(imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImg(undefined);
  };
  useEffect(() => {
    reset({
      receiptName: edit?.receiptName || '',
      // gender: edit?.gender || 'Male',
    });
  }, [edit, reset]);
  const handleClose = () => {
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
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
        <FormLayout cardHeading={translate('upload_image')}>
          <GSImageUpload
            name="logoImage"
            selectedImg={selectedImg}
            onClick={handleRemoveImage}
            quantity={false}
            errors={{ slider_image: errors.logoImage?.message }}
            touched={{}} // You can manage touched state if necessary
            category={false}
            onChange={(event) => handleImageUpload(event)}
          />
        </FormLayout>
        <FormLayout cardHeading={translate('receipt_details')}>
          <Controller
            control={control}
            name="receiptName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('receipt_name')}
<<<<<<< HEAD
                helperText={errors.receiptName?.message}
=======
                helperText={errors.header?.message}
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea
                error={Boolean(errors.header)}
                placeholder={translate('receipt_name')}
              />
            )}
          />

          <Controller
            control={control}
            name="header"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('header')}
                helperText={errors.header?.message}
                error={Boolean(errors.header)}
                placeholder={translate('header')}
              />
            )}
          />

          <Controller
            control={control}
            name="footer"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('footer')}
                helperText={errors.footer?.message}
                error={Boolean(errors.footer)}
                placeholder={translate('footer')}
              />
            )}
          />

          <GSCustomStackLayout direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <Controller
              name="showCustomerInfo"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate('show_customer_info')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
              )}
            />

            <Controller
              name="ShowComments"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate('show_comments')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
              )}
            />

            <Controller
              name="printOrders"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate('print_orders')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
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
