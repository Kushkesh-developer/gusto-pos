import { Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import type { FC } from 'react';

interface LoginProps {
    title: string
}

const Login: FC<LoginProps> = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Card sx={{ minWidth: 500, padding: 3 }} variant="elevation">
                <CardContent>
                    <Image src="/next.svg" alt="Next.js Logo" width={180} height={100} priority style={{ marginBottom: 40 }} />
                    <Stack spacing={2}>
                        <TextField id="outlined-basic" label="Email" variant="outlined"/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                    </Stack>
                    <Button>Forgot Password?</Button>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', px: 2, mt: 4 }}>
                    <Button variant="contained" type='submit' size="large" fullWidth>LOGIN</Button>
                </CardActions>
            </Card>
            <Typography variant="body2" maxWidth={400} textAlign={'center'} mt={2} color={'text.secondary'}>
                © 2024 GustoPOS, Encoresky Technologies Pvt. Ltd. All rights reserved.
            </Typography>
        </main>
    );
}

export default Login;
