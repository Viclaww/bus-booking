import React from "react";
import avatar from "../assets/pngkey.com-avatar-png-1149878.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authAction";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className=" header flex justify-between items-center p-2 box-border bg-black w-full h-16">
        <h2 className="text-xl text-white">Bus Booker</h2>
        {user ? (
          <div className="flex w-1/6 justify-between">
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
            <img src={avatar} className="w- h-10" alt="" />
          </div>
        ) : (
          <img src={avatar} className="w- h-10" alt="" />
        )}
      </div>
    </>
  );
};

export default Header;
