import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className=" h-[90vh] w-full flex flex-col items- justify-center place-items-center">
      <div className="auth-links text-white">
        <NavLink
          className="active:bg-slate-700 text-2xl  font-bold"
          to="register"
        >
          Register
        </NavLink>
        <NavLink className="active:bg-slate-700 text-2xl  font-bold" to="login">
          Login
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Auth;
