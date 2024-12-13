import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { Button } from '@mui/material';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
<<<<<<< HEAD
=======
import { useDrawerContext } from '@/context/DrawerProvider';
>>>>>>> 8503f8dd1fa4c09e6e7e5b23fac52d16265632ea

const generateZodSchema = () => {
  return z.object({
    alipay: z.boolean().optional(),
    payment2: z.boolean().optional(),
    payment3: z.boolean().optional(),
    payment4: z.boolean().optional(),
  });
};

export default function PaymentDrawer(props) {
  const { translate } = useLocalization();
  const schema = generateZodSchema();
  const { drawerPosition } = useDrawerContext();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      alipay: false,
      payment2: false,
      payment3: false,
    },
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <PageHeader title={translate('add_new_payment')} hideSearch={true} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('payment_details')}>
          <GSCustomStackLayout direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <Controller
              name="alipay"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate('alipay')}
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
              name="payment2"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate('payment2')}
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
              name="payment3"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate('payment3')}
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
