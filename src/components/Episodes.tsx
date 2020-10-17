import React from 'react';
import PodcastCard from "./PodcastCard";
import { IPodcast } from "../types/podcast";

const Episodes = (episodes: IPodcast[] | null) => {
    console.log("Episodes: ");
    console.log(episodes);

    return episodes ? episodes.map(episode => (
        <div className={episode.id}>
            {PodcastCard(episode, true)}
        </div>
    )) : null;
}

export default Episodes;
