import React, { useState } from "react";
import { localGovernments } from "./localGovement";
import { searchTransits } from "../redux/actions/transitAction";
import { useDispatch, useSelector } from "react-redux";
const Booker = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const dispatch = useDispatch();
  const [searchClicked, setSearchClicked] = useState(false);
  const { isSearching, searchResults, searchError } = useSelector(
    (state) => state.transitReducer
  );

  const handleFromChange = (event) => {
    setFromCity(event.target.value);
  };

  const handleToChange = (event) => {
    setToCity(event.target.value);
  };

  const handleSearchBus = (e) => {
    e.preventDefault();
    if (fromCity === "" || toCity === "") {
      alert("Please select both 'Traveling From' and 'Traveling To' cities.");
      return;
    }

    if (fromCity === toCity) {
      alert(
        "Please select different cities for 'Traveling From' and 'Traveling To'."
      );
      return;
    }

    dispatch(searchTransits(fromCity, toCity));
    console.log("Search Bus from", fromCity, "to", toCity);
    setSearchClicked(true);
  };
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <form className="h-[70vh] flex w-full place-items-center ">
        <div className="justify-center items-center text-left h-auto p-5 bg-blue-500 w-[360px] shadow-xl mx-auto flex flex-col">
          <h4 className="text-xl font-bold">Book Seat</h4>
          <p>Traveling From:</p>
          <select
            className="border-[1px] p-1 w-[250px] h-[50px] rounded-lg border-black"
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
          <p>Traveling To:</p>
          <select
            className="border-[1px] p-1 w-[250px] h-[50px] rounded-lg border-black"
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

          <button
            className="p-1 text-white bg-slate-900 w-[250px] h-[40px] mt-3"
            onClick={handleSearchBus}
          >
            Search Bus
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booker;
