import React, { useState } from "react";
import { Modal, Button, Typography, Box } from "@mui/material";

const BookingModal = ({
  open,
  handleClose,
  capacity,
  from,
  to,
  handleBook,
}) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBookNow = () => {
    if (selectedSeat !== null) {
      handleBook(selectedSeat);
      handleClose();
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
          selectedSeat === seat ? "selected" : ""
        }`}
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
        <Typography variant="h6" component="div">
          Select a Seat
        </Typography>
        <div className="seats-container">{renderSeats()}</div>
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
