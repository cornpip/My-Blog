import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MainFeaturedPost from '../component/Blog/MainFeaturedPost';
import Footer from '../component/Blog/Footer';
import '../css/Blog.module.css';
import FeaturedBlock from '../component/Blog/FeaturedBlock';
import ResponsiveAppBar from '../component/AppBar/ResponsiveAppBar';
import Toolbar from '@mui/material/Toolbar';

const mainFeaturedPost = {
  title: 'cornpip Blog',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

export default function Blog() {
  console.log("@@@: Blog");
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} sx={{ maxWidth: { md: "95%" } }}>
        <ResponsiveAppBar />
        <Toolbar />
        {/* toolbar는 수평요소로 붙이려고 쓰는건데 일단 AppBar 반응형 사이즈랑 같은 듯 하니 일단 두자 */}
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <FeaturedBlock />
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
}