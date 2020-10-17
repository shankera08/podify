import React, { useContext } from 'react';

import PodcastCard from "./PodcastCard";
import Episodes from "./Episodes";
import { playerStore } from "../store/player";
import { IPodcast } from "../types/podcast";

const Podcasts = (shows: IPodcast[] | null) => {
    const playerState = useContext(playerStore);

    return (
        <div className="category-podcast__container">
        {shows ? shows.map(show => (
        <div className={show.id}>
            {PodcastCard(show, false)}
        </div>
    )) : null}
    {playerState.state.episodes ? (
            <div className="podcast-episodes">
                {Episodes(playerState.state.episodes)}
            </div>
        ): null}
    </div>
    );
}

export default Podcasts;
