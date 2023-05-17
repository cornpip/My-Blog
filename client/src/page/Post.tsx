import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import BasicCard from "../component/Blog/BasicCard";
import Sidebar from "../component/Blog/Sidebar";
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useGetIdPostQuery } from "../api/api";
import BasicMd from "../component/Blog/BasicMd";
import ResponsiveAppBar from "../component/AppBar/ResponsiveAppBar";
import Toolbar from "@mui/material/Toolbar";
import Footer from "../component/Blog/Footer";
import Loading from "./Loading";
import Box from "@mui/material/Box";

const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
        { title: 'January 2020', url: '#' },
        { title: 'November 1999', url: '#' },
        { title: 'October 1999', url: '#' },
        { title: 'September 1999', url: '#' },
        { title: 'August 1999', url: '#' },
        { title: 'July 1999', url: '#' },
        { title: 'June 1999', url: '#' },
        { title: 'May 1999', url: '#' },
        { title: 'April 1999', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'Twitter', icon: TwitterIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
};

let theme = createTheme({
    spacing: 8, //default값
});
theme = responsiveFontSizes(theme);

export default function Post() {
    const { postId } = useParams();
    const post_query = useGetIdPostQuery({ id: postId });

    return (
        <>
            <CssBaseline />
            <ResponsiveAppBar />
            <Toolbar />
            <Grid container direction="row" spacing={{ xs: 2, sm: 3, lg: 4, xl: 5 }} sx={{ pt: { xs: 2, sm: 3, lg: 4, xl: 5 } }}>
                <Grid item xs={12} md={2}>
                    <BasicCard customSx={{
                        position: "sticky",
                        top: (theme: Theme) => theme.spacing(3),
                    }} />
                </Grid>
                <Grid item container spacing={0} xs={12} md={8}>
                    <Grid item container xs={12} sx={{ justifyContent: "center" }}>
                        {post_query.isLoading ? <Loading /> : post_query.data ? <Box
                            component="img"
                            sx={{
                                height: { sm: 350, md: 400, xl: 450 },
                                objectFit: "cover"
                            }}
                            alt={`${post_query.data?.images[0].imageName}`}
                            src={`${process.env.REACT_APP_IMAGE}/${post_query.data?.images[0].imageName}`}
                        /> : "Fail"}
                    </Grid>
                    <Grid item xs={12} sx={{
                        '& .markdown': {
                            py: 3,
                        },
                    }}>
                        {post_query.isLoading ? <Loading /> : post_query.data ? <BasicMd post={post_query.data} /> : "Fail"}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Sidebar
                        title={sidebar.title}
                        description={sidebar.description}
                        archives={sidebar.archives}
                        social={sidebar.social}
                        customSx={{
                            position: "sticky",
                            top: (theme: Theme) => theme.spacing(3),
                        }}
                    />
                </Grid>
            </Grid>


            {/* <Grid container spacing={5} sx={{ mt: 0 }}>
                <Grid item container xs={12} md={12} sx={{ justifyContent: "center" }}>
                    <Box
                        component="img"
                        sx={{
                            height: { xs: 250, sm: 300, md: 320, lg: 340 },
                            objectFit: "contain"
                        }}
                        alt="The house from the offer."
                        src={`${process.env.REACT_APP_IMAGE}/${post_query.data?.images[0].imageName}`}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <BasicCard />
                </Grid>
                <Grid item xs={12} md={8} sx={{
                    '& .markdown': {
                        py: 3,
                    },
                }}>
                    {post_query.isLoading ? <Loading /> : post_query.data ? <BasicMd post={post_query.data} /> : "Fail"}
                </Grid>
                <Grid item xs={12} md={2}>
                    <Sidebar
                        title={sidebar.title}
                        description={sidebar.description}
                        archives={sidebar.archives}
                        social={sidebar.social}
                    />
                </Grid>
            </Grid> */}
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </>
    )
}