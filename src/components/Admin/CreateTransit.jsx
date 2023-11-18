import React, { useState } from "react";
import { localGovernments } from "../localGovement";

const CreateTransit = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [price, setPrice] = useState("");

  const handleFromChange = (event) => {
    setFromCity(event.target.value);
  };

  const handleToChange = (event) => {
    setToCity(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center h-[90vh] items-center">
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
          onChange={handleToChange}
        >
          <option value="" disabled hidden>
            Number of Sitters
          </option>
          <option>10</option>
          <option>15</option>
          <option>30</option>
        </select>

        <input
          className="border-[1px] py-2 p-1 w-[300px] h-[50px] rounded-lg border-black"
          type="price"
          placeholder="Price"
          onChange={handlePrice}
        ></input>

        <input
          type="date"
          defaultValue={currentDate}
          className="border-[1px] p-1 py-2 w-[300px] h-[40px] rounded-lg border-black"
        />
        <button className="p-1 text-white bg-slate-900 w-[300px] h-[40px] mt-3">
          Create Transit
        </button>
      </form>
    </div>
  );
};

export default CreateTransit;
