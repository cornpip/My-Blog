import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

export default function Loading() {
    return (
        <>
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
                    <CircularProgress color='inherit' />
                </Box>
            </Container>
        </>
    )
}