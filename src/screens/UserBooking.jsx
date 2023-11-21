import React from "react";
import Booker from "../components/Booker";
import AvailableTransits from "../components/AvailableTransits";
import { useSelector } from "react-redux";
import SearchResult from "../components/SearchResult";
const UserBooking = () => {
  const { isSearching, searchResults, searchError, searchClicked } =
    useSelector((state) => state.transitReducer);
  return (
    <>
      <Booker />
      {searchClicked && (
        <SearchResult
          searchResults={searchResults}
          isSearching={isSearching}
          searchError={searchError}
        />
      )}
      <AvailableTransits />
    </>
  );
};

export default UserBooking;
