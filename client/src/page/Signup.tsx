import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGetCheckQuery } from '../api/api';
import SignForm from '../component/Blog/SignForm';
import Footer from '../component/Blog/Footer';
import SignUpForm from '../component/Blog/SignUpForm';

const theme = createTheme();

export default function SignUp() {
    // login된 상태면 나가게
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
                        Sign Up
                    </Typography>
                    <SignUpForm />
                </Box>
                <Footer
                    title="Footer"
                    description="Something here to give the footer a purpose!"
                />
            </Container>
        </ThemeProvider>
    );
}   