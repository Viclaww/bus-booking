import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransits, removeTransit } from "../redux/actions/transitAction";
import travel from "../assets/travel.jpg";

const AvailableTransits = () => {
  const dispatch = useDispatch();
  const transits = useSelector((state) => state.transitReducer.transits);
  const isLoading = useSelector((state) => state.transitReducer.isLoading);
  const role = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    // Fetch transits when the component mounts
    dispatch(fetchTransits());
  }, [dispatch]);

  const handleCancelTransit = (transitId) => {
    dispatch(removeTransit(transitId));
  };

  return (
    <div
      className={
        isLoading
          ? "w-full h-[50vh] flex justify-center flex-col items-center"
          : "w-auto px-10 flex items-center flex-col"
      }
    >
      <h2 className="text-3xl font-bold mb-10">Available Transits</h2>
      {isLoading ? <div className="loader"></div> : ""}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 relative">
        {transits.map((transit) => (
          <div
            className="w-auto relative py-2 px-2 justify-between bg-black text-white my-2 mx-2"
            key={(transitId = transit.id)}
          >
            <img src={travel} alt="" />
            <p className="text-center sm:text-sm lg:text-xl font-bold">
              {transit.From} <span className="text-lg font-light">To</span>{" "}
              {transit.To}
            </p>
            <p className="absolute bg-black bg-opacity-40 top-24 left-3 p-1 rounded-lg">
              <span className="line-through">N</span>
              {transit.Price}
            </p>
            <p>Capacity: {transit.Capacity}</p>
            <p className="absolute bg-opacity-40 bg-black top-3 right-3 p-1 rounded-lg">
              {transit.LeaveDate}
            </p>
            {role === "admin" ? (
              <button
                onClick={() => handleCancelTransit(transitId)}
                className="w-full text-center text-black mt-3 py-2 bg-white"
              >
                Cancel Transit
              </button>
            ) : (
              <button className="w-full text-center bg-white mt-3 py-2 text-black">
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableTransits;
