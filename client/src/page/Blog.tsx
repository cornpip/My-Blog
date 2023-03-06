import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../component/Blog/Header';
import MainFeaturedPost from '../component/Blog/MainFeaturedPost';
import FeaturedPost from '../component/Blog/FeaturedPost';
import Main from '../component/Blog/Main';
import Sidebar from '../component/Blog/Sidebar';
import Footer from '../component/Blog/Footer';
import { post1, post2, post3 } from '../markdown';
import '../css/Blog.module.css';

const sections = [
  { title: 'Ai', url: 'ai' },
  { title: 'Algorithm', url: '#' },
  { title: 'Back-end', url: '#' },
  { title: 'Front-end', url: '#' },
  { title: 'DB', url: '#' },
  { title: 'Git', url: '#' },
  { title: 'Employment', url: '#' },
];

const mainFeaturedPost = {
  title: 'cornpip Blog',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

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

const theme = createTheme({
  spacing: 8, //default값
});

let posts = [post1, post2, post3, "./markdown/hello.md"];
// post = /react_io/static/media/blog-post.1.feffb8942bbd17649053.md

interface test{
  chapter :string
}

Blog.defaultProps = {
  chapter: ""
}

function Blog(props: test) {
  const {chapter} = props;
  console.log("bloggggggggg", chapter)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header title={"Blog" + (chapter ? `_${chapter}`: ``)} sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3}}>
            <Main />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export default Blog