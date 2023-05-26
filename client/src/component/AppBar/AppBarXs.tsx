import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CategoryIcon from '@mui/icons-material/Category';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { sections } from "../../constants/sections";

/** Popover API
 * anchorOrigin : anchorEl의 어느 지점으로 anchor를 열까에 대해서
 * transformOrigin : anchorEl의 열기로 한 꼭지점과 만나는 anchor의 꼭지점에 대해서
 * ex)
 * anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
 * transformOrigin={{ vertical: 'center', horizontal: 'left'}}
 * 
 * ex) anchorEl의 하단오른쪽 점이 anchor의 왼쪽 중간점과 맞닿도록
 **/

export default function AppBarXs() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.currentTarget);
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {sections.map((section) => (
                        <MenuItem key={section.title} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{section.title}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <CategoryIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href={process.env.REACT_APP_ROOT2}
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    // fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Cornpip
            </Typography>

        </>
    )
}