import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import NavBar from "./components/navbar";
import SignIn from "./components/signIn";
import Register from "./components/register";
import Comments from "./components/comments";

function App() {
  return (
    <div>
      {console.log("hi    ")}
      <NavBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
