import React from "react";

import PodcastCard from "../card/PodcastCard";

// Types
import { IPodcast } from "../../types/podcast";

const Podcasts = ({ podcasts }: { podcasts: IPodcast[] | null }) => {
  return (
    <div className="category-podcast__container">
      {podcasts
        ? podcasts.map((podcast) => (
            <div className={`category-podcast__${podcast.id}`} key={podcast.id}>
              <PodcastCard
                podcast={podcast}
                isEpisode={false}
                source={"category-podcast"}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Podcasts;
