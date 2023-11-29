// BookedTransits.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookedTransits } from "../redux/actions/userActions";

const BookedTransits = () => {
  const { bookedTransits, isLoading, error } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch an action to fetch the user's booked transits when the component mounts
    dispatch(fetchBookedTransits());
  }, [dispatch]);

  return (
    <div>
      <h1>Your Booked Transits</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!isLoading && !error && bookedTransits.length === 0 && (
        <p>No booked transits available.</p>
      )}

      {bookedTransits.map((transit) => (
        <div key={transit.id}>
          <p>
            {transit.from} to {transit.to}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookedTransits;
