import { Toolbar, Typography } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';

export default function () {
    return (
        <>
            <Toolbar disableGutters>
                <CategoryIcon fontSize='large' sx={{ display: "flex" }} />
                <Typography
                    variant="h6"
                    noWrap //자리가 없어도 한 줄에 배치되게
                    component="a"
                    href={process.env.REACT_APP_ROOT2}
                    sx={{
                        mr: 2,
                        display: "flex",
                        // fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Cornpip
                </Typography>
            </Toolbar>
        </>
    )
}