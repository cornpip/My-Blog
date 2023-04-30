import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import Footer from "../component/Blog/Footer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

let theme = createTheme({
    spacing: 8,
});
theme = responsiveFontSizes(theme);

export default function NoPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} sx={{ maxWidth: { md: "95%" } }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    height: 300,
                    borderRadius: 1,
                }}>
                    <Typography variant='h2'>
                        This page does not exist
                    </Typography>
                </Box>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    )
}