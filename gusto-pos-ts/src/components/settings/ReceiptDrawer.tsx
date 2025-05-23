import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { TranslateFn } from '@/types/localization-types';
import { Button } from '@mui/material';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
type EditType = {
  id?: string | number;
  email?: string;
  [key: string]: unknown;
  group: string;
  name?: string;
  receiptName?: string;
};
type OutletDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};

interface FormData {
  receiptName: string;
  header: string;
  footer: string;
  showCustomerInfo: boolean;
  ShowComments: boolean;
  printOrders: boolean;
  logoImage: string;
}
const generateZodSchema = (translate: TranslateFn) => {
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

export default function ReceiptDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit,
}: OutletDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    receiptName: '',
    header: '',
    footer: '',
    showCustomerInfo: false,
    ShowComments: false,
    printOrders: false,
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  useEffect(() => {
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
  }, [edit, reset]);
  console.log('errors=>', errors);
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
    reset({
      ...defaultValues,
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  const handleDrawerClose = (event: React.SyntheticEvent, reason: string) => {
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(event)}
          />
        </FormLayout>
        <FormLayout cardHeading={translate('receipt_details')}>
          <Controller
            control={control}
            name="receiptName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('receipt_name')}
                helperText={errors.receiptName?.message}
                error={Boolean(errors.header)}
                placeholder={translate('enter_receipt_name')}
              />
            )}
          />
          <Controller
            control={control}
            name="header"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('header')}
                helperText={errors.header?.message}
                error={Boolean(errors.header)}
                placeholder={translate('enter_header')}
              />
            )}
          />
          <Controller
            control={control}
            name="footer"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('footer')}
                helperText={errors.footer?.message}
                error={Boolean(errors.footer)}
                placeholder={translate('enter_footer')}
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
