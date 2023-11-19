import Header from "./components/header";
import { useEffect } from "react";
import UserBooking from "./screens/UserBooking";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./screens/auth";
import Register from "./components/Register";
import Login from "./components/login";
import AdminDashboard from "./screens/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      if (window.location.pathname !== "/auth/register") {
        navigate("/auth/login");
      }
    }
  }, [user, loading, navigate]);
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route
          exact
          path="/dashboard"
          element={
            user && user.role === "admin" ? <AdminDashboard /> : <UserBooking />
          }
        />
        <Route exact path="auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
