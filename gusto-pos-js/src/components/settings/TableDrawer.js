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
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import { outlets } from '@/mock/common';

import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
import { floorsMockResponse } from '@/mock/setting';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';

const generateZodSchema = (translate) => {
  return z.object({
    floor: z.string().min(1, translate('select_floor_is_required')),
    tableName: z.string().min(1, translate('table_name_is_required')),
    outlets: z.string().min(1, translate('outlet_is_required')),
    seat: z.string().min(1, translate('seat_is_required')),
    link: z.string().optional(),
  });
};

export default function TerminalDrawer({ open, onClose, formTitle, edit, setEdit }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedImg, setSelectedImg] = useState(undefined);
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    floor: '',
    tableName: '',
    outlets: '',
    seat: '',
    link: '',
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (edit) {
      reset({
        tableName: edit?.tableName || '',
        floor: edit?.floor || '',
        seat: edit?.seat || '',
        outlets:
          typeof edit?.outlets === 'string'
            ? { label: edit?.outlets, value: edit?.outlets } // Convert string to object
            : edit?.outlets || '', // Handle the outlet properly

        // gender: edit?.gender || 'Male',
      });
    } else {
      reset({
        floor: '',
        tableName: '',
        outlets: '',
        seat: '',
        link: '',
      });
    }
  }, [edit, reset]);
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
        setValue('logoImage', imgData); // Set the image data in the form
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImg(undefined);
    setValue('logoImage', ''); // Clear the slider_image value in the form
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
      <Box mb={5}>
        <FormLayout cardHeading={translate('table_details')}>
          <Controller
            control={control}
            name="tableName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('table_name')}
                helperText={errors.tableName?.message}
                error={Boolean(errors.tableName)}
                placeholder={translate('enter_table_name')}
              />
            )}
          />

          <Controller
            control={control}
            name="seat"
            render={({ field }) => (
              <GSNumberInput
                {...field}
                requiredMark
                label={translate('seats')}
                helperText={errors.seat?.message}
                error={Boolean(errors.seat)}
                placeholder={translate('enter_seats')}
              />
            )}
          />

          <Controller
            control={control}
            name="link"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('link')}
                helperText={errors.link?.message}
                error={Boolean(errors.link)}
                placeholder={translate('link')}
              />
            )}
          />

          <Controller
            control={control}
            name="outlets"
            render={({ field }) => (
              <GSSelectInput
                {...field}
                requiredMark
                options={outlets}
                value={edit?.outlet ? outlets.find((o) => o.label === edit.outlet)?.value : ''}
                label={translate('outlet')}
                helperText={errors.outlets?.message}
                error={Boolean(errors.outlets)}
                placeholder={translate('outlet')}
              />
            )}
          />

          <Controller
            control={control}
            name="floor"
            render={({ field }) => (
              <GSSelectInput
                {...field}
                requiredMark
                options={floorsMockResponse}
                label={translate('select_floor')}
                helperText={errors.floor?.message}
                error={Boolean(errors.floor)}
                placeholder={translate('select_floor')}
              />
            )}
          />

          <GSCustomStackLayout withoutGrid>
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
