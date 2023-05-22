import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Link from '@mui/material/Link';
import { useSetCheckMutation } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function SignForm() {
    const navigate = useNavigate();
    const [setCheck, setCheckResult] = useSetCheckMutation();

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

        const res: any = await setCheck({ email: email, password: password });
        // setCheckResult는 한 차례 전의 data로 나온다.
        // console.log(setCheckResult);

        // type이...?
        // console.log("############", res.data, res.error.data.message);
        if (res.data) navigate(`${process.env.REACT_APP_ROOT2}`);

        //error msg info
        if (res.error) setInfo(res.error.data.message);
    };

    return (
        <>
            <>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: 1 }}>
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
                </Box>
                <Grid container>
                    <Grid item xs>
                        <Link component="button" onClick={() => { }} underline="hover" variant="body2">
                            {`아이디를 잃어버리셨나요?`}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link component="button" onClick={() => {
                            navigate(`${process.env.REACT_APP_ROOT}/signup`)
                        }}
                            underline="hover" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </>
        </>
    )
}