import React from "react";
import PodcastCard from "../card/PodcastCard";
import { IPodcast } from "../../types/podcast";

const Episodes = (episodes: IPodcast[] | null, source: string = "") => {
  return episodes
    ? episodes.map((episode) => (
        <div className={`${source}__${episode.id}`}>
          {PodcastCard(episode, true, source)}
        </div>
      ))
    : null;
};

export default Episodes;
