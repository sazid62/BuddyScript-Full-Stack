import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Reg from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { stateStruct } from "./interfaces/user_interface";
import { useEffect } from "react";
import { initializeAllPost, initializeUser } from "./features/login/Userslice"; // Update this path
import initialize_whole_slice from "./components/useInitializeApp";
import { useInitializeApp } from "./components/useInitializeApp";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const current_user = useSelector((state: stateStruct) => state.currentuser);

  useEffect(() => {
    //intialize current User
  }, []);
  useInitializeApp(1);
  // Redirect if not logged in
  useEffect(() => {
    // console.log(location.pathname, "path");
    if (!current_user.email && location.pathname === "/home") {
      navigate("/");
    }
  }, []);

  return (
    <>
      {location.pathname === "/home" && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
