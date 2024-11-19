import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { TranslateFn } from '@/types/localization-types';
import { Typography, Button } from '@mui/material';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';

type OutletDrawerProps = {
  open: boolean;
  onClose: () => void;
};

interface FormData {
  header: string;
  footer: string;
  showCustomerInfo: boolean;
  ShowComments: boolean;
  printOrders: boolean;
  logo_image: string;
}
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    Header: z.string().min(1, translate('header_text_is_must')),
    footer: z.string().min(1, translate('footer_text_is_required')),
    showCustomerInfo: z.string().optional(),
    ShowComments: z.string().optional(),
    printOrders: z.boolean().optional(),
  });
};
export default function ReceiptDrawer(props: OutletDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      header: '',
      footer: '',
      showCustomerInfo: false,
      ShowComments: false,
      printOrders: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result as string;
        setSelectedImg(imgData);
        setValue('logo_image', imgData); // Set the image data in the form
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImg(undefined);
    setValue('logo_image', ''); // Clear the slider_image value in the form
  };
  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <Typography variant="h6">{translate('add_new_receipt')} </Typography>
      <Box mb={5}>
        <FormLayout cardHeading={translate('upload_image')}>
          <GSImageUpload
            name="logo_image"
            selectedImg={selectedImg}
            onClick={handleRemoveImage}
            quantity={false}
            errors={{ slider_image: errors.logo_image?.message }}
            touched={{}} // You can manage touched state if necessary
            category={false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(event)}
          />
        </FormLayout>
        <FormLayout cardHeading={translate('receipt_details')}>
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
        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={props.onClose}>
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
