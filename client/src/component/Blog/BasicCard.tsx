import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CustomSxProps } from '../../interface/blog.interface';

export default function BasicCard(props: CustomSxProps) {
    const { customSx } = props;
    return (
        <Card sx={{
            borderRadius: "20%", maxHeight: { "xs":100, "sm":200, "md": 700, "lg": 800 },
            ...customSx,
        }}>
            <CardContent>
                <Typography variant="h1" component="div">
                    AD on the left
                </Typography>
                <Typography variant="h2" component="div">
                    AD on the left
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}