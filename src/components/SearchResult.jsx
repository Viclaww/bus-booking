import React from "react";
import travel from "../assets/travel.jpg";
import { bookTransit } from "../redux/actions/transitAction";
const SearchResult = ({ searchResults, isSearching, searchError }) => {
  const handleBookTransit = (e) => {
    const transitId = e.target.id;
    if (userId && transitId) {
      dispatch(bookTransit(transitId, userId));
    } else {
      console.error("Invalid userId or transitId");
    }
  };
  return (
    <div
      className={
        isSearching
          ? "w-full  flex justify-center flex-col items-center"
          : "w-auto mb-20 px-10 flex items-center flex-col"
      }
    >
      <h2 className="text-3xl font-bold mb-10">Search Results</h2>
      {Array.isArray(searchResults) &&
      searchResults.length === 0 &&
      !isSearching ? (
        <p>No results found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 relative">
          {Array.isArray(searchResults) &&
            searchResults.map((result) => (
              <div
                className="w-auto relative py-2 px-2 justify-between bg-black text-white my-2 mx-2"
                key={result.id}
              >
                <img src={travel} alt="" />
                <p className="text-center text-sm font-bold">
                  {result.From} <span className="font-light">To</span>{" "}
                  {result.To}
                </p>
                <p className="absolute bg-black bg-opacity-40 top-[7.1rem] left-3 p-1 rounded-lg">
                  <span className="line-through">N</span>
                  {result.Price}
                </p>
                <p>Capacity: {result.Capacity}</p>
                <p className="absolute bg-opacity-40 bg-black top-3 right-3 p-1 rounded-lg">
                  {result.LeaveDate}
                </p>
                <button
                  id={result.id}
                  onClick={handleBookTransit}
                  className="w-full text-center bg-white mt-3 py-2 text-black"
                >
                  Book Now
                </button>
              </div>
            ))}
        </div>
      )}
      {isSearching ? <div className="loader"></div> : null}
      {searchError ? (
        <>
          <h2>Error getting Results</h2>
        </>
      ) : null}
    </div>
  );
};

export default SearchResult;
