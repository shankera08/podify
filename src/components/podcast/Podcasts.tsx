import React, { useContext } from 'react';

import PodcastCard from "../card/PodcastCard";

// Types
import { IPodcast } from "../../types/podcast";

const Podcasts = (shows: IPodcast[] | null) => {
    return (
    <div className="category-podcast__container">
        {shows ? shows.map(show => (
        <div className={show.id}>
            {PodcastCard(show, false)}
        </div>
        )) : null}
    </div>
    );
}

export default Podcasts;
