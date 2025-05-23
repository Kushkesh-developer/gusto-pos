'use client';
import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookie from 'js-cookie';
import { useLocalization } from '@/context/LocalizationProvider';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import LogoHorizontalWithText from '@/components/Logo/LogoHorizontalWithText';

const Login = () => {
  const router = useRouter();
  const { translate } = useLocalization();

  // Define the schema for validation using zod
  const loginSchema = zod.object({
    email: zod
      .string({
        required_error: translate('email_is_required'),
        invalid_type_error: translate('email_invalid_format'),
      })
      .email(),
    password: zod.string({
      required_error: translate('password_is_required'),
      invalid_type_error: translate('password_invalid_format'),
    }),
  });

  // Initialize react-hook-form with zodResolver for validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    Cookie.set('loggedIn', 'true');
    Cookie.set('email', data.email);
    Cookie.set('password', data.password);
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
        minHeight: '100vh',
      }}
    >
      <Card
        sx={{ minWidth: { xs: '90%', sm: 500 }, padding: { xs: 1, sm: 3 }, mt: 2 }}
        variant="elevation"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LogoHorizontalWithText />
            </Box>
            <Stack spacing={2}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    label={translate('email')}
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    label={translate('password')}
                    variant="outlined"
                    isPassword
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Stack>
            <Button onClick={() => router.push('/forgot-password')}>
              {translate('forgot_password') + '?'}
            </Button>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', px: 2, mt: 4 }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              {translate('login')}
            </Button>
          </CardActions>
        </form>
      </Card>
      <Typography
        variant="body2"
        maxWidth={400}
        textAlign={'center'}
        mt={2}
        color={'text.secondary'}
      >
        {translate('copyright_text')}
      </Typography>
    </Box>
  );
};

export default Login;
