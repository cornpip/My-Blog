import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicCard() {
    return (
        <Card sx={{
            borderRadius: "20%", maxHeight: { "xs":100, "sm":200, "md": 700, "lg": 800 }
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