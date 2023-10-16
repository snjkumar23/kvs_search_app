import React, { useState } from "react";
import EntityList from "./EntityList";
import SearchEntities from "./SearchEntities";



export const Entities = () => {

  const [entities, setEntites] = useState([]);

  const handleOnChange = (entities) => {
    setEntites(entities);
  };

  return (
    <div >
      <SearchEntities handleOnChange={handleOnChange} />
      <EntityList results={entities} />
    </div>
  );
};
