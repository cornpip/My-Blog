import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AuthAPI from '../../api/auth';
import AppBarXs from './AppBarXs';
import AppBarMd from './AppBarMd';
import AvatarLogin from './AvatarLogin';
import AvatarAnonymous from './AvatarAnonymous';
import SearchBasic from './SearchBasic';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { useGetCheckQuery } from '../../api/api';
import client from '../../api/axios';
import axios from "axios";
import { Typography } from '@mui/material';


interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    //자식요소가 있다면 children은 기본 prop에 담겨 넘어온다.
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    // console.log(trigger, children);
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function ResponsiveAppBar() {
    console.log("@@@: ResponsiveAppBar");
    const [login, setLogin] = useState(false);
    // const login_query = useGetCheckQuery({});

    // window.addEventListener('pageshow', function (event) {
    //     if (event.persisted) {
    //         console.log('This page was restored from the bfcache.');
    //     } else {
    //         console.log('This page was loaded normally.');
    //     }
    // });

    async function loginCheck() {
        console.log("login check");
        try {
            // console.log("!!!!!!!!2", await AuthAPI.check());
            const url = "http://localhost:8000/auth/testing";
            // const res = await axios.get(url,
            //     { withCredentials: true });
            // const res = await fetch(url, {
                //     method: "GET",
                //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     credentials: "include",
                    // })
            // console.log("~~~~~~~~~", await res.json());
            // if (res) {
                //     console.log("!@#!@#", res);
                //     setLogin(true);
                // }

            const res = await AuthAPI.check();
            console.log("~~~~~~~~~", res);
            setLogin(res);
        } catch (e) {
            setLogin(false);
        }
    }

    useEffect(() => {
        console.log("run useEffect in responsiveAppBar");
        loginCheck();
    }, [])

    return (
        <HideOnScroll>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AppBarXs />
                        <AppBarMd />
                        {/* <SearchBasic /> */}
                        <Box sx={{ flexGrow: 0 }}>
                            {login ? <AvatarLogin loginCheck={loginCheck} /> : <AvatarAnonymous />}
                            {/* {login_query.isFetching ? "loading" : ""}
                            <Typography>
                                {login_query.data}
                            </Typography> */}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </HideOnScroll>

    );
}
export default ResponsiveAppBar;

//<HideOnScroll {...props}> //무슨 children