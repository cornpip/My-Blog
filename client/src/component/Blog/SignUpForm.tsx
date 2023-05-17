import { ThemeProvider } from "@emotion/react";
import { Box, Button, Container, TextField, Typography, createTheme } from "@mui/material";
import { useState } from "react";
import AuthAPI from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { SignUpRes } from "../../interface/auth.interface";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [err1, setErr1] = useState<boolean>(false);
    const [err2, setErr2] = useState<boolean>(false);

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
        if (!email) return setErr1(true);
        if (!password) return setErr2(true);

        const res: SignUpRes = await AuthAPI.signup({ email: email, password: password });
        if (res.flag) navigate(`${process.env.REACT_APP_ROOT}/signin`);
        else setInfo(res.msg);
    };

    return (
        <>
            {/* Box에 noValidate하면 입력하세요 안뜸 */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: 1 }}>
                <Typography>
                    Account Email
                </Typography>
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
                <Typography>
                    Password
                </Typography>
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

                <Typography variant="body1" align="center" color="error">
                    {info}
                </Typography>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create Account
                </Button>
            </Box>
        </>
    )
}