import React, { useDeferredValue, useState, useEffect } from "react";

import EntityList from "./EntityList";
import SearchEntities from "./SearchEntities";
import { API_GW_URL } from "../config"


export const Entities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entitiesData, setEntites] = useState([]);

  const deferredInput = useDeferredValue(searchTerm);

  useEffect(() => {
    if (deferredInput !== "") {
      fetchEntities(deferredInput).then((entities) => {
        setEntites(entities);
      });
    } else {
      setEntites([]);
    }
  }, [deferredInput]);

  const fetchEntities = async (input) => {
    return fetch(
      `${API_GW_URL}?q=${input}`
    )
      .then((res) => res.json())
      .then((entitiesData) => {
        return entitiesData.hits.hits;
      });
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="entities">
      <h1>Real Time Video Analytics</h1>
      <SearchEntities handleOnChange={handleOnChange} />
      <EntityList results={entitiesData} />
    </div>
  );
};
