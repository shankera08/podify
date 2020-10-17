import React, { useContext } from 'react';

// Types
import { IPodcast } from "../types/podcast";
import { PlayerActionType } from "../types/player";

// Store
import { playerStore } from "../store/player";

import { getEpisodes } from "../api/podcast";

import podcastDefaultImg from "../Img/podcast-default.jpg";

const PodcastCard = (podcast: IPodcast, isEpisode: boolean = false) => {
    const { dispatch } = useContext(playerStore);
    const displayImg = podcast.imageUrl || podcastDefaultImg;

    const clickHandler = () => {
        if (isEpisode) {
            dispatch({type: PlayerActionType.play, payload: { currentEpisode: podcast }});
        } else {
            getEpisodes(podcast.id, 10)
            .then(episodes => {
                dispatch({type: PlayerActionType.update, payload: { currentShowId: podcast.id, episodes }});
            })
            .catch((error) => {
                throw error;
            });
        }
    }

    return podcast.title ? (
        <div className="card" onClick={clickHandler}>
            <img className="card__image" src={displayImg}/>
            <div className="card__title">
                {podcast.title}
            </div>
        </div>
    ) : null;
}

export default PodcastCard;