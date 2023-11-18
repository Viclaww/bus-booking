import React from "react";

const Booker = () => {
  const localGovernments = [
    "Lagos Mainland",
    "Abuja Municipal",
    "Port Harcourt",
    "Ikeja",
    "Kano Municipal",
    "Enugu North",
    "Benin City",
    "Abeokuta South",
    "Ibadan North",
    "Jos North",
    "Maiduguri",
    "Calabar Municipal",
    "Uyo",
    "Owerri Municipal",
    "Kaduna North",
    "Warri South",
    "Onitsha North",
    "Eket",
    "Osogbo",
    "Katsina",
  ];

  return (
    <div>
      <form className="h-[90vh] flex w-full place-items-center ">
        <div className="justify-center items-center text-left h-auto p-5 bg-blue-500 w-[360px] shadow-xl mx-auto flex flex-col">
          <h4 className="text-xl font-bold">Book Seat</h4>
          <p>Traveling From:</p>
          <select
            className="border-[1px] p-1 w-[250px] h-[50px] rounded-lg border-black"
            defaultValue=""
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
          <p>Travel Date</p>
          <input
            type="date"
            className="border-[1px] p-1 w-[250px] h-[40px] rounded-lg border-black"
          />
          <button className="p-1 text-white bg-slate-900 w-[250px] h-[40px] mt-3 ">
            Search Bus
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booker;
