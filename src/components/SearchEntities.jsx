import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { API_GW_URL } from '../config';

const SearchEntities = (props) => {

  const [entities, setEntites] = useState([])
  const [selected, setSelected] = useState("")

  useEffect(() => {
    fetchEntities().then((entities) => {
      setEntites(entities);
    });

  }, []);

  useEffect(() => {
    fetchEntities().then((entities) => {
      setEntites(entities);
    });

  }, [selected]);


  const changeHandler = async (current) => {
    const search_term = current && current.length > 0 ? current[0].name : ''
    return fetch(
      `${API_GW_URL}?q=${search_term}`
    )
      .then((res) => res.json())
      .then((entitiesData) => {
        console.log(entitiesData)
        props.handleOnChange(entitiesData.hits.hits)
      });
  };


  const fetchEntities = async () => {
    return fetch(
      `${API_GW_URL}`
    )
      .then((res) => res.json())
      .then((entitiesData) => {
        const result = entitiesData.hits.hits;
        const entities = result.map(e => e._source)
        const unique_entities = entities.filter((ele, index) => entities.findIndex(obj => obj.name === ele.name) === index)
        return unique_entities
      });
  };

  return (
    <div className="typeahead">
      <h2 className='title'>Video Analytics App</h2>
      <Form.Group>
        <Typeahead
          id="search-typeahead"
          labelKey="name"
          onChange={changeHandler}
          options={entities}
          placeholder="Search Entity..."
          selected={selected}
        />
      </Form.Group>
    </div>


  )
}

export default SearchEntities;