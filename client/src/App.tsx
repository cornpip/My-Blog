import "./css/App.module.css";
import Blog from "./page/Blog";
import Ai from "./page/Ai";
import Upload from "./page/Upload"
import Test from "./page/Test";
import Edit from "./page/Edit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./page/Signin";

const root_path = "/react_io"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={process.env.REACT_APP_ROOT} element={<Blog />} />
        <Route path={process.env.REACT_APP_ROOT + "/ai"} element={<Ai />} />
        <Route path={process.env.REACT_APP_ROOT + "/upload"} element={<Upload />}/>
        <Route path={process.env.REACT_APP_ROOT + "/edit"} element={<Edit />}/>
        <Route path={process.env.REACT_APP_ROOT + "/signin"} element={<SignIn />}/>
        <Route path="/test" element={<Test />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
