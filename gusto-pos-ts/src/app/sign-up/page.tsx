'use client';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useLocalization } from '@/context/LocalizationProvider';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookie from 'js-cookie';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import LogoHorizontalWithText from '@/components/Logo/LogoHorizontalWithText';

const Signup = () => {
  const { translate } = useLocalization();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  // Define the schema for validation using zod
  const signupSchema = zod
    .object({
      username: zod.string({
        required_error: translate('username_is_required'),
      }),
      email: zod
        .string({
          required_error: translate('email_is_required'),
          invalid_type_error: translate('email_invalid_format'),
        })
        .email(),
      password: zod
        .string({
          required_error: translate('password_is_required'), // Added required error message
        })
        .min(6, {
          message: translate('password_must_be_at_least_6_charact'),
        }),
      confirmPassword: zod.string({
        required_error: translate('confirm_password_is_required'), // Added required error message
      }),
    })
    .refine(
      (data) => {
        // Only check password match if both fields have values
        if (data.password && data.confirmPassword) {
          return data.password === data.confirmPassword;
        }
        return true; // Skip match validation if either field is empty
      },
      {
        message: translate('new_passwords_must_match'),
        path: ['confirmPassword'],
      },
    );

  // Initialize react-hook-form with zodResolver for validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LogoHorizontalWithText />
            </Box>
            <Stack spacing={2}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    label={translate('user_name')}
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message as string}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    requiredMark
                    label={translate('email')}
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    requiredMark
                    label={translate('password')}
                    variant="outlined"
                    isPassword
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <GSTextInput
                    {...field}
                    requiredMark
                    isPassword
                    label={translate('confirm_new_password')}
                    variant="outlined"
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message as string}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', px: 2, mt: 4 }}>
            <Button variant="contained" type="submit" size="large" fullWidth>
              {translate('sign-up')}
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

export default Signup;
