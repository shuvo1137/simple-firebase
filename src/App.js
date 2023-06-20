import logo from "./logo.svg";
import "./App.css";
import Header from "./Component/Header/Header";
import { Route, Routes } from "react-router";
import Home from "./Component/Home/Home";
import Email from "./Component/Email/Email";
import GoogleSignIn from "./Component/GoogleSign/GoogleSignIn";
import app from "./Component/Firebase/firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/google" element={<GoogleSignIn></GoogleSignIn>}></Route>
        <Route path="/email" element={<Email></Email>}></Route>
      </Routes>
    </div>
  );
}

export default App;
