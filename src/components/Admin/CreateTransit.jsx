import React, { useState } from "react";
import { localGovernments } from "../localGovement";
import { useDispatch, useSelector } from "react-redux";
import { addTransit } from "../../redux/actions/transitAction";
import { toast } from "react-toastify";

const CreateTransit = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(currentDate);
  const [capacity, setCapacity] = useState("10");
  const [transitData, setTransitData] = useState();
  const handleFromChange = (event) => {
    setFromCity(event.target.value);
  };

  const handleToChange = (event) => {
    setToCity(event.target.value);
  };
  const handlePrice = (event) => {
    // Get the entered value
    let input = event.target.value;

    // Remove non-numeric characters
    input = input.replace(/[^0-9]/g, "");

    // Update the state with the cleaned input
    setPrice(input);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handleCapacity = (event) => {
    setCapacity(event.target.value);
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromCity || !toCity || !price || !date || !capacity) {
      toast.error("Please fill in all fields");
      return;
    }
    const newTransitData = {
      From: fromCity,
      To: toCity,
      Price: price,
      Capacity: capacity,
      LeaveDate: date,
    };

    setTransitData(newTransitData);

    try {
      await dispatch(addTransit(newTransitData));
      setFromCity("");
      setToCity("");
      setPrice("");
      setDate(currentDate);
      setCapacity("10");
    } catch (error) {
      console.error("Error adding transit to Firestore:", error);
    }
  };

  return (
    <div className="flex justify-center h-[70vh] items-center">
      <form className="w-auto p-10 h-[50vh] rounded-xl flex flex-col justify-between  bg-blue-500">
        <select
          className="border-[1px] p-1 py-2 w-[300px] h-[50px] rounded-lg border-black"
          defaultValue=""
          onChange={handleFromChange}
        >
          <option value="" disabled hidden>
            Select City
          </option>
          {localGovernments.map((localGov, index) => (
            <option key={index} value={localGov}>
              {localGov}
            </option>
          ))}
        </select>

        <select
          className="border-[1px] py-2 p-1 w-[300px] h-[50px] rounded-lg border-black"
          defaultValue=""
          onChange={handleToChange}
        >
          <option value="" disabled hidden>
            Select Destination
          </option>
          {localGovernments.map((localGov, index) => (
            <option key={index} value={localGov}>
              {localGov}
            </option>
          ))}
        </select>

        <select
          className="border-[1px] py-2 p-1 w-[300px] h-[50px] rounded-lg border-black"
          defaultValue=""
          onChange={handleCapacity}
        >
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>30</option>
        </select>

        <input
          className="border-[1px] py-2 p-1 w-[300px] h-[50px] rounded-lg border-black"
          placeholder="Price"
          onChange={handlePrice}
        ></input>

        <input
          type="date"
          defaultValue={currentDate}
          onChange={handleDate}
          className="border-[1px] p-1 py-2 w-[300px] h-[40px] rounded-lg border-black"
        />
        <button
          onClick={handleSubmit}
          className="p-1 text-white bg-slate-900 w-[300px] h-[40px] mt-3"
        >
          Create Transit
        </button>
      </form>
    </div>
  );
};

export default CreateTransit;
