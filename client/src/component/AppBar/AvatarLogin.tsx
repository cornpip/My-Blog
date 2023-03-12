import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import AuthAPI from '../../api/auth';
import BasicModal from '../Modal/BasicModal';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
interface AvatarLoginProps {
    loginCheck: () => void;
}

export default function AvatarLogin({ loginCheck }: AvatarLoginProps) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    async function handleLogout() {
        setOpen(true);
        return;
    }

    async function yesHandler() {
        setOpen(false);
        await AuthAPI.logout();
        loginCheck(); //로그인 state계속 업데이트
        return;
    }

    async function noHandler() {
        setOpen(false);
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
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
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
                <MenuItem key="Logout" onClick={handleLogout}>
                    <Typography textAlign="center">LOGOUT</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}