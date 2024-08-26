"use client"
import { Box, Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookie from 'js-cookie'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    console.log("🚀 ~ Login ~ email:", email, password)

    function onClickLogin() {
        console.log('login')
        Cookie.set('loggedIn', 'true')
        Cookie.set('email', email)
        Cookie.set('password', password)
        router.push('/dashboard')
    }

    return (
        <Box sx={{ display: 'flex', flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight:"100vh"}}>
            <Card sx={{ minWidth: 500, padding: 3 }} variant="elevation">
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src="/next.svg" alt="Next.js Logo" width={180} height={100} priority style={{ marginBottom: 40 }} />
                    </Box>
                    <Stack spacing={2}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={(e) => setPassword(e.target.value)}/>
                    </Stack>
                    <Button>Forgot Password?</Button>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', px: 2, mt: 4 }}>
                    <Button
                        variant="contained"
                        type='submit' size="large"
                        fullWidth
                        onClick={() => onClickLogin()}
                    >LOGIN</Button>
                </CardActions>
            </Card>
            <Typography variant="body2" maxWidth={400} textAlign={'center'} mt={2} color={'text.secondary'}>
                © 2024 GustoPOS, Encoresky Technologies Pvt. Ltd. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Login;
