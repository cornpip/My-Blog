import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CategoryIcon from '@mui/icons-material/Category';
import { sections } from '../../constants/sections';

export default function AppBarMd() {
    function handle() {
        return;
    }

    return (
        <>
            <CategoryIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap //자리가 없어도 한 줄에 배치되게
                component="a"
                href={process.env.REACT_APP_ROOT2}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    // fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Cornpip
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {sections.map((section) => (
                    <Button
                        key={section.title}
                        onClick={handle}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {section.title}
                    </Button>
                ))}
            </Box>
        </>
    )
}