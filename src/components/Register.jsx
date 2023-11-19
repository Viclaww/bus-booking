import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, phone, password } = formData;
    dispatch(register(name, email, phone, password));
  };
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth || {});
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    };
  }, [user, navigate]);
  return (
    <>
      <form
        onSubmit={handleRegister}
        className="justify-between bg-yellow-700 my-3 p-5 top-[30%] w-[360px] shadow-xl mx-auto items-center  flex flex-col"
      >
        <input
          type="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border-[1px] p-1 mb-2 w-[250px] h-[40px] rounded-lg border-black"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border-[1px] mb-2 p-1 w-[250px] h-[40px] rounded-lg border-black"
          placeholder="email"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border-[1px] p-2 mb-1 w-[250px] h-[40px] rounded-lg border-black"
          placeholder="Phone Number"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border-[1px] p-1 mb-2 w-[250px] h-[40px] rounded-lg border-black"
          placeholder="Password"
        />

        <button type="submit" className="auth-button">
          {loading ? "Loading...." : "Register"}
        </button>
      </form>
    </>
  );
};

export default Register;
