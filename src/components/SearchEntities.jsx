import React from "react";

const SearchEntities = ({ handleOnChange }) => {
  return (
    <>
      <input
        type="text"
        onChange={handleOnChange}
        placeholder="Search for Entities"
      />
    </>
  );
};

export default SearchEntities;
