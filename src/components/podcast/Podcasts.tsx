import React, { useState } from "react";

// Internal imports
import PodcastCard from "../card/PodcastCard";

import "./style.css";

// Types
import { IPodcast } from "../../types/podcast";

/**
 *
 * @param {podcasts} an array of podcast objects for a single category
 * @returns {JSX} Returns JSX with carousal for the list of podcasts
 */

const Podcasts = ({ podcasts }: { podcasts: IPodcast[] | null }) => {
  // local state to manage the carousal of podcasts
  const [listObj, setList] = useState<{
    list: IPodcast[] | null;
    lIndex: number;
    rIndex: number;
  }>({
    list: podcasts ? podcasts.slice(0, 5) : null,
    lIndex: 0,
    rIndex: 5
  });

  const updateList = (offset: number) => {
    // update the displayed list of podcasts
    if (podcasts) {
      if (
        listObj.rIndex + offset <= podcasts.length &&
        listObj.lIndex + offset >= 0
      ) {
        const left = listObj.lIndex + offset;
        const right = listObj.rIndex + offset;

        if (left < right) {
          setList({
            list: podcasts.slice(left, right),
            lIndex: left,
            rIndex: right
          });
        }
      }
    }
  };

  const arrowClickLeft = () => {
    updateList(-1);
  };

  const arrowClickRight = () => {
    updateList(1);
  };

  return (
    <div className="category-podcast__container">
      <div className="category-podcast__icons" onClick={arrowClickLeft}>
        <i className="fas fa-angle-left"></i>
      </div>
      {listObj.list
        ? listObj.list.map((podcast) => (
            <PodcastCard
              podcast={podcast}
              isEpisode={false}
              source={"category-podcast-content"}
              key={`podcasts-${podcast.id}`}
            />
          ))
        : null}
      <div className="category-podcast__icons" onClick={arrowClickRight}>
        <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
};

export default Podcasts;
