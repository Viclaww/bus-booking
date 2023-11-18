import React, { useEffect, useState, useMemo } from "react";
import { login } from "../redux/actions/authAction";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    dispatch(login(email, password));
    setFormData({
      email: "",
      password: "",
    });
  };
  const navigate = useNavigate();
  const { user, loading } = useSelector(
    (state) => state.auth || {},
    shallowEqual
  );

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);
  return (
    <>
      <form
        onSubmit={handleLogin}
        className="justify-between  left-[35%]  p-5 top-[30%] w-[360px] shadow-xl mx-auto items-center  flex flex-col"
      >
        <input
          id="email"
          onChange={handleChange}
          type="email"
          className="border-[1px] mb-2 p-1 w-[250px] h-[40px] rounded-lg border-black"
          placeholder="Email"
        />

        <input
          id="password"
          onChange={handleChange}
          type="password"
          className="border-[1px] p-1 mb-2 w-[250px] h-[40px] rounded-lg border-black"
          placeholder="Password"
        />

        <button className="auth-button">
          {loading ? "Loading...." : "Login"}
        </button>
      </form>
    </>
  );
};

export default Login;
