import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppBarXs from './AppBarXs';
import AppBarMd from './AppBarMd';
import AvatarLogin from './AvatarLogin';
import AvatarAnonymous from './AvatarAnonymous';
import SearchBasic from './SearchBasic';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { useGetCheckQuery } from '../../api/api';
import { CircularProgress, Typography } from '@mui/material';


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
     //3번 렌더링 관련 주석 FeaturedBlock에 있음
    const login_query = useGetCheckQuery({});

    // useEffect(() => {
    //     console.log("run useEffect in responsiveAppBar");
    // }, [])

    return (
        <HideOnScroll>
            <AppBar>
                <Container maxWidth={false} sx={{ maxWidth: { md: "90%" } }}>
                    <Toolbar disableGutters>
                        <AppBarXs />
                        <AppBarMd />
                        {/* <SearchBasic /> */}
                        <Box sx={{ flexGrow: 0 }}>
                            {login_query.isLoading ?
                                <CircularProgress color='inherit' />
                                : login_query.error ? <AvatarAnonymous /> : <AvatarLogin />}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </HideOnScroll>
    );
}
export default ResponsiveAppBar;

//<HideOnScroll {...props}> //무슨 children