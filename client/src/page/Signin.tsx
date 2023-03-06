import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AuthAPI from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Copyright from '../component/Blog/CopyRight';

const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [err1, setErr1] = useState<boolean>(false);
    const [err2, setErr2] = useState<boolean>(false);
    const navigate = useNavigate();

    function emailHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setEmail(e.target.value);
    }

    function pwdHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); //전송 후 자동 새로고침방지

        //초기화 및 빈칸 방지
        setInfo(""); setErr1(false); setErr2(false);
        if(!email) return setErr1(true);
        if(!password) return setErr2(true);

        //error msg info
        try{
            await AuthAPI.signin({ email: email, password: password });
            navigate(`${process.env.REACT_APP_ROOT}`);
        }catch (e: any){
            // const err = e as AxiosError;
            const err_msg = e.response?.data?.message;
            if(err_msg) setInfo(err_msg);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={emailHandler}
                            error={err1}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={pwdHandler}
                            error={err2}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            onChange={()=>console.log("hello form")}
                        /> */}
                        <Typography variant="body1" align="center" color="error">
                            {info}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {`아이디를 잃어버리셨나요?`}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}   