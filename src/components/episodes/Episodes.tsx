import React from "react";

// Internal imports
import PodcastCard from "../card/PodcastCard";

// Types
import { IPodcast } from "../../types/podcast";

/**
 *
 * @param episodes list of episodes based on the selected podcast
 * @param source this defines where this action was initiated
 */
const Episodes = (episodes: IPodcast[] | null, source: string = "") => {
  return episodes
    ? episodes.map((episode) => (
        <PodcastCard
          podcast={episode}
          isEpisode={true}
          source={source}
          key={`episode-${episode.id}`}
        />
      ))
    : null;
};

export default Episodes;
