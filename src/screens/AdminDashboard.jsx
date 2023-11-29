import React from "react";
import CreateTransit from "../components/Admin/CreateTransit";
import AvailableTransits from "../components/AvailableTransits";

const AdminDashboard = () => {
  return (
    <>
      <CreateTransit />
      <AvailableTransits />
      <div className="flex flex-col bg-slate-500  absolute top-24 text-2xl text-center right-5 justify-between p-10">
        <h1> Number of Customers: 29</h1>
        <a className="text-blue-700" href="">
          View Customer
        </a>
      </div>
    </>
  );
};

export default AdminDashboard;
