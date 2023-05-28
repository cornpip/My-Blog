import './css/App.module.css'
import Blog from "./page/Blog";
import Ai from "./page/Ai";
import Upload from "./page/Upload"
import Posting from "./page/Posting";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./page/Signin";
import Post from "./page/Post";
import NoPage from "./page/NoPage";
import ScrollTop from "./component/Blog/ScrollTop";
import SignUp from "./page/Signup";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// import Test from "./page/Test";

let theme = createTheme({
  spacing: 8, //default값
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={process.env.REACT_APP_ROOT} element={<Blog />} />
          <Route path={process.env.REACT_APP_ROOT + "/post/:postId"} element={<Post />} />
          <Route path={process.env.REACT_APP_ROOT + "/ai"} element={<Ai />} />
          <Route path={process.env.REACT_APP_ROOT + "/upload"} element={<Upload />} />
          <Route path={process.env.REACT_APP_ROOT + "/posting"} element={<Posting />} />
          <Route path={process.env.REACT_APP_ROOT + "/signin"} element={<SignIn />} />
          <Route path={process.env.REACT_APP_ROOT + "/signup"} element={<SignUp />} />

          <Route path={process.env.REACT_APP_ROOT + "*"} element={<NoPage />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path={"*"} element={<NoPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
