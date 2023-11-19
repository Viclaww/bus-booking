import React from "react";
import CreateTransit from "../components/Admin/CreateTransit";
import AvailableTransits from "../components/availableTransits";

const AdminDashboard = () => {
  return (
    <>
      <CreateTransit />
      <AvailableTransits />
    </>
  );
};

export default AdminDashboard;
