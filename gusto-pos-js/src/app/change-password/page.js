'use client';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  IconButton } from
'@mui/material';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useLocalization } from '@/context/LocalizationProvider';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import LogoHorizontalWithText from '@/components/Logo/LogoHorizontalWithText';







const generateZodSchema = (translate) => {
  return z.
  object({
    oldPassword: z.
    string({ required_error: translate('old_password_is_required') }).
    min(1, translate('old_password_is_required')),
    newPassword: z.
    string({ required_error: translate('new_password_is_required') }).
    min(6, translate('password_must_be_at_least_6_charact')),
    confirmNewPassword: z.string({ required_error: translate('please_confirm_your_password') })
  }).
  refine((data) => data.newPassword === data.confirmNewPassword, {
    message: translate('new_passwords_must_match'),
    path: ['confirmNewPassword']
  });
};

const ChangePassword = () => {
  const { translate } = useLocalization();
  const router = useRouter();

  const changePasswordSchema = generateZodSchema(translate);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(changePasswordSchema)
  });

  const onSubmit = async (data) => {
    console.log(data);
    router.push('/dashboard');
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

      <Card
        sx={{ minWidth: { xs: '90%', sm: 500 }, padding: { xs: 1, sm: 3 }, mt: 2 }}
        variant="elevation">

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <IconButton onClick={() => router.push('/login')} sx={{ mb: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LogoHorizontalWithText />
            </Box>
            <Stack spacing={2}>
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) =>
                <GSTextInput
                  {...field}
                  label={translate('old_password')}
                  variant="outlined"
                  isPassword
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message} />

                } />

              <Controller
                name="newPassword"
                control={control}
                render={({ field }) =>
                <GSTextInput
                  {...field}
                  label={translate('new_password')}
                  variant="outlined"
                  isPassword
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message} />

                } />

              <Controller
                name="confirmNewPassword"
                control={control}
                render={({ field }) =>
                <GSTextInput
                  {...field}
                  requiredMark
                  label={translate('confirm_new_password')}
                  variant="outlined"
                  isPassword
                  error={!!errors.confirmNewPassword}
                  helperText={errors.confirmNewPassword?.message} />

                } />

            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', px: 2, mt: 4 }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              {translate('change_password')}
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

export default ChangePassword;