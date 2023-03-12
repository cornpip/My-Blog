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

function ResponsiveAppBar() {
    const [login, setLogin] = useState(false);

    async function loginCheck() {
        console.log("login check");
        try {
            setLogin(await AuthAPI.check());
        } catch (e) {
            setLogin(false);
        }
    }

    useEffect(() => {
        loginCheck();
    }, [])

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AppBarXs />
                    <AppBarMd />
                    {/* <SearchBasic /> */}
                    <Box sx={{ flexGrow: 0 }}>
                        {login ? <AvatarLogin loginCheck={loginCheck} /> : <AvatarAnonymous />}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;