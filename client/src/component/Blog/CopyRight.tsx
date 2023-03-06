import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href={`${process.env.REACT_APP_ROOT}`} target="_blank" rel="noreferrer">
                seonhyo blog
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}