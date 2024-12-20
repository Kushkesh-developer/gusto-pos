import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { Button } from '@mui/material';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';












const generateZodSchema = () => {
  return z.object({
    alipay: z.boolean().optional(),
    payment2: z.boolean().optional(),
    payment3: z.boolean().optional(),
    payment4: z.boolean().optional()
  });
};

export default function PaymentDrawer({ open, onClose }) {
  const { translate } = useLocalization();
  const schema = generateZodSchema();
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    alipay: false,
    payment2: false,
    payment3: false
  };
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  const handleClose = () => {
    reset({
      ...defaultValues
    });
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2
        }
      }}>

      <PageHeader title={translate('add_new_payment')} hideSearch={true} onClose={handleClose} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('payment_details')}>
          <GSCustomStackLayout direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <Controller
              name="alipay"
              control={control}
              render={({ field }) =>
              <GSSwitchButton
                {...field}
                label={translate('alipay')}
                labelPlacement="start"
                sx={{
                  display: 'block',
                  marginTop: '20px !important',
                  marginLeft: 0
                }} />

              } />

            <Controller
              name="payment2"
              control={control}
              render={({ field }) =>
              <GSSwitchButton
                {...field}
                label={translate('payment2')}
                labelPlacement="start"
                sx={{
                  display: 'block',
                  marginTop: '20px !important',
                  marginLeft: 0
                }} />

              } />

            <Controller
              name="payment3"
              control={control}
              render={({ field }) =>
              <GSSwitchButton
                {...field}
                label={translate('payment3')}
                labelPlacement="start"
                sx={{
                  display: 'block',
                  marginTop: '20px !important',
                  marginLeft: 0
                }} />

              } />

          </GSCustomStackLayout>
        </FormLayout>
      </Box>
      <Box
        sx={{
          display: 'flex',
          minWidth: '100%',
          justifyContent: 'flex-end',
          mt: 2
        }}>

        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={onClose}>
          {translate('cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}>

          {translate('save')}
        </Button>
      </Box>
    </Drawer>);

}