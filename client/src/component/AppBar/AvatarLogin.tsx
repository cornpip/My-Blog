import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import AuthAPI from '../../api/auth';
import BasicModal from '../Modal/BasicModal';
import { useGetCheckQuery, useSetCheckMutation } from '../../api/api';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';


const menuSetting = ['Profile', 'Account', 'Dashboard', 'Posting', 'Logout'];

export default function AvatarLogin() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const login_query = useGetCheckQuery({});
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    async function logoutHandler() {
        setOpen(true);
        return;
    }

    async function yesHandler() {
        setOpen(false);
        await AuthAPI.logout();
        //로그인 state계속 업데이트
        login_query.refetch();
        return;
    }

    async function noHandler() {
        setOpen(false);
    }

    async function postHandler(){
        navigate(process.env.REACT_APP_ROOT + `/upload`);
    }

    return (
        <>
            <BasicModal open={open} setOpen={setOpen} text={`
        Are you sure you want to Logout?`} yesHandler={yesHandler} noHandler={noHandler} />
            <Tooltip title="Click to view your Profile" placement="left">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: { sx: 0, sm: 1 } }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {/* <MenuItem key="Logout" onClick={logoutHandler}>
                    <Typography textAlign="center">LOGOUT</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={logoutHandler}>
                    <Typography textAlign="center">LOGOUT</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={logoutHandler}>
                    <Typography textAlign="center">LOGOUT</Typography>
                </MenuItem> */}
                {menuSetting.map((menu) => {
                    let clickEvent = ()=>{};
                    const u_menu = menu.toUpperCase();
                    
                    if(u_menu == "LOGOUT") clickEvent = logoutHandler;
                    if(u_menu == "POSTING") clickEvent = postHandler;
                    return (
                        <MenuItem key={menu} onClick={clickEvent}>
                            <Typography textAlign="center">{menu}</Typography>
                        </MenuItem>
                    )
                })}
                {/* <Divider /> */}
            </Menu>
        </>
    )
}