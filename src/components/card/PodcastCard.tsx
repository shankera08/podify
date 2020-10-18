import React, { useContext } from "react";

// Types
import { IPodcast } from "../../types/podcast";
import { PlayerActionType } from "../../types/player";

// Store
import { playerStore } from "../../store/player";

import { getEpisodes } from "../../api/podcast";

import podcastDefaultImg from "../../Img/podcast-default.jpg";

const PodcastCard = (
  podcast: IPodcast,
  isEpisode: boolean = false,
  source: string = ""
) => {
  const { dispatch } = useContext(playerStore);
  const displayImg = podcast.imageUrl || podcastDefaultImg;

  const onClickCard = () => {
    if (isEpisode) {
      dispatch({
        type: PlayerActionType.play,
        payload: { currentEpisode: podcast }
      });
    } else {
      getEpisodes(podcast.id, 20)
        .then((episodes) => {
          dispatch({
            type: PlayerActionType.update,
            payload: {
              currentShow: podcast,
              episodes,
              displayEpisodesModal: true
            }
          });
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return podcast.title ? (
    <div className={`${source}__card`} onClick={onClickCard}>
      <img className={`${source}__card-image`} src={displayImg} />
      <div className={`${source}__card-title`}>{podcast.title}</div>
    </div>
  ) : null;
};

export default PodcastCard;
