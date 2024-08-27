"use client";
import { Box, Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller,SubmitHandler,FieldValues } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookie from 'js-cookie';
// interface FieldValues {
//     email: string
//     password: string
    
//   }
// Define the schema for validation using zod
const loginSchema = zod.object({
    email: zod.string().min(1, { message: 'Email is required' }).email(),
    password: zod.string().min(1, { message: 'Password is required' }),
});
// type FieldValues = zod.infer<typeof loginSchema>;
const Login = () => {
  const router = useRouter();

  // Initialize react-hook-form with zodResolver for validation
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data:FieldValues) => {
    console.log('login', data);
    Cookie.set('loggedIn', 'true');
    Cookie.set('email', data.email);
    Cookie.set('password', data.password);
    router.push('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
      <Card sx={{ minWidth: 500, padding: 3 }} variant="elevation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Image src="/next.svg" alt="Next.js Logo" width={180} height={100} priority style={{ marginBottom: 40 }} />
          </Box>
          <Stack spacing={2}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
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
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  type='password'
                  error={!!errors.password}
                  helperText={errors.password?.message as string}
                />
              )}
            />
          </Stack>
          <Button>Forgot Password?</Button>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', px: 2, mt: 4 }}>
          <Button
            variant="contained"
            type='submit'
            size="large"
            fullWidth
         
          >
            LOGIN
          </Button>
        </CardActions></form>
      </Card>
      <Typography variant="body2" maxWidth={400} textAlign={'center'} mt={2} color={'text.secondary'}>
        © 2024 GustoPOS, Encoresky Technologies Pvt. Ltd. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Login;
