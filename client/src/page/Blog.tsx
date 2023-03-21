import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import MainFeaturedPost from '../component/Blog/MainFeaturedPost';
import Main from '../component/Blog/Main';
import Sidebar from '../component/Blog/Sidebar';
import Footer from '../component/Blog/Footer';
import '../css/Blog.module.css';
import FeaturedBlock from '../component/Blog/FeaturedBlock';
import ResponsiveAppBar from '../component/AppBar/ResponsiveAppBar';
import Toolbar from '@mui/material/Toolbar';
import BasicCard from '../component/Blog/BasicCard';


const mainFeaturedPost = {
  title: 'cornpip Blog',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};


interface test {
  chapter: string
}

Blog.defaultProps = {
  chapter: ""
}

let theme = createTheme({
  spacing: 8, //default값
});
theme = responsiveFontSizes(theme);
// container sx={{ maxWidth: {xl: "95%"} }}
export default function Blog(props: test) {
  const { chapter } = props;
  console.log("bloggggggggg", chapter);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ maxWidth: {md: "95%"} }}>
        <ResponsiveAppBar />
        <Toolbar />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <FeaturedBlock />
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}