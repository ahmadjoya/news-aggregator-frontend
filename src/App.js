import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginForm from "./Components/auth/login";
import SignUpForm from "./Components/auth/sign-up";
import Home from "./Components/home";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const access_token = cookies["auth"]?.access_token;
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={access_token ? <Navigate to="/" /> : <LoginForm />}
        />
        <Route
          exact
          path="/register"
          element={access_token ? <Navigate to="/" /> : <SignUpForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
