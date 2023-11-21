import React from "react";
import CreateTransit from "../components/Admin/CreateTransit";
import AvailableTransits from "../components/AvailableTransits";

const AdminDashboard = () => {
  return (
    <>
      <CreateTransit />
      <AvailableTransits />
    </>
  );
};

export default AdminDashboard;
