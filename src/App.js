import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/auth/login";
import SignUpForm from "./Components/auth/sign-up";
import Home from "./Components/home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/sign-up" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
