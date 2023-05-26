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
// import Test from "./page/Test";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
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
    </BrowserRouter>
  );
}

export default App;
