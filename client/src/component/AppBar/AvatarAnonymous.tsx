import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

export default function AvatarAnonymous() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate(`${process.env.REACT_APP_ROOT}/signin`);
    };

    return (
        <>
            <Tooltip title="LOGIN" placement="left">
                <IconButton onClick={handleLogin} sx={{ p: 0 }}>
                    <Avatar>?</Avatar>
                </IconButton>
            </Tooltip>
        </>
    )
}