import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";

function App() {
  const { authUser } = useAuth();

  return (
    <div className="h-screen flex bg-white overflow-auto">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          element={authUser ? <Navigate to="/" /> : <Login />}
          path="/login"
        />
        <Route
          element={authUser ? <Navigate to="/" /> : <SignUp />}
          path="/signup"
        />
      </Routes>
    </div>
  );
}

export default App;
