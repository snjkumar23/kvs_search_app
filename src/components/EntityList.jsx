import React from "react";
import { CLOUDFRONT_URL } from "../config"

const EntityList = ({ results }) => {
  console.log(results)

  const filtered = results.filter((ele, index) => results.findIndex(obj => obj.name == ele.name && obj._source.ts == ele._source.ts) === index)

  const generateDatabaseDateTime = (date) => {
    return date.toISOString().replace("T", " ").substring(0, 19);
  }

  return (
    <div>
      {filtered?.map((result) => {
        const video_url = result._source.videoClipName;

        const absolute_video_url = 'https://' + CLOUDFRONT_URL + "/" + video_url
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
              <section className="entity_info">
                <div ><b>Entity Detected:</b> {result._source.name}</div>
                <div ><b>Video Clip Start Time:</b> {generateDatabaseDateTime(new Date(base_ts))}</div>
                <div ><b>Entity Detection Time:</b> {generateDatabaseDateTime(timestamp)}</div>
                <div ><b>Entity Detected at {ts / 1000}th second in video</b> </div>
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
