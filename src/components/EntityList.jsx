import React from "react";
import { CLOUDFRONT_URL } from "../config"

const EntityList = ({ results }) => {
  console.log(results)

  const filtered = results.filter((ele, index) => results.findIndex(obj => obj.value == ele.value) === index)

  console.log('filtered', filtered)

  return (
    <div>
      {filtered?.map((result) => {
        const video_url = result._source.videoClipName;

        const absolute_video_url = CLOUDFRONT_URL + "/" + video_url
        const base_ts = result._source.base_timestamp
        const ts = result._source.ts
        const timestamp = new Date(parseInt(base_ts) + parseInt(ts))
        return (
          <>
            <h2 className="entity_search"> Search Results</h2>
            <hr />
            <div className="entity" key={result.name}>
              <video width="300px" height="200px" controls>
                <source src={`${absolute_video_url}`} type="video/mp4" />
              </video>
              <section className="entity__info">
                <div className="entity__name"><b>Entity Detected:</b> {result._source.name}</div>
                <div className="entity__name"><b>Detection Time:</b> {timestamp.toISOString()}</div>
              </section>
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
};

export default EntityList;
