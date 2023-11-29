import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { bookTransit, fetchBookedSeats } from "../redux/actions/transitAction";

const BookingModal = ({ open, handleClose, capacity, userId, transitId }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const bookedSeats = useSelector((state) => state.transitReducer.bookedSeats);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookedSeats(transitId));
  }, [dispatch, transitId]);

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const isSeatBooked = (seat) => {
    return bookedSeats && bookedSeats.includes(seat);
  };
  const handleBookNow = () => {
    if (selectedSeat !== null) {
      handleClose();
      dispatch(bookTransit(transitId, userId, selectedSeat));
    }
  };

  const renderSeats = () => {
    // Logic to render seats based on capacity
    const seats = Array.from({ length: capacity }, (_, index) => index + 1);
    return seats.map((seat) => (
      <button
        key={seat}
        onClick={() => handleSeatSelection(seat)}
        className={`seat p-2 bg-black m-2 text-white ${
          selectedSeat === seat ? "selected " : ""
        }${isSeatBooked(seat) ? "booked text-blue-500 bg-white" : ""}`}
      >
        {seat}
      </button>
    ));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {/* <Typography>
        {from} To {to}
      </Typography> */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
          component="div"
        >
          Select a Seat:
        </Typography>
        <div className="seats-container grid grid-cols-3 ">{renderSeats()}</div>
        <div className=" mt-3 flex justify-between w-full">
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleBookNow} variant="contained">
            Book Now
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default BookingModal;
