'use client';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,

  Typography } from
'@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';

const ForgotPassword = () => {
  const router = useRouter();
  const { translate } = useLocalization();

  // Define the schema for validation using zod
  const passwordSchema = zod.object({
    email: zod.
    string({
      required_error: translate('email_is_required'),
      invalid_type_error: translate('email_invalid_format')
    }).
    email()
  });

  // Initialize react-hook-form with zodResolver for validation
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(passwordSchema)
  });

  // Handle form submission
  const onSubmit = async () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>

      <Card sx={{ minWidth: { xs: '80%', sm: 500 }, padding: 3 }} variant="elevation">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/logo-with-text.png"
                alt="Gusto POS Logo"
                width={200}
                height={140}
                priority
                style={{ marginBottom: 40, objectFit: 'contain' }} />

            </Box>
            <Stack spacing={2}>
              <Controller
                name="email"
                control={control}
                render={({ field }) =>
                <GSTextInput
                  {...field}
                  label={translate('email')}
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message} />

                } />

            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', px: 2, mt: 4 }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              {translate('forgot_password')}
            </Button>
          </CardActions>
        </form>
      </Card>
      <Typography
        variant="body2"
        maxWidth={400}
        textAlign={'center'}
        mt={2}
        color={'text.secondary'}>

        {translate('copyright_text')}
      </Typography>
    </Box>);

};

export default ForgotPassword;