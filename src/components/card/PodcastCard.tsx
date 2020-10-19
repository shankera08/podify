import React, { useContext } from "react";

// Method for API Calls
import { getEpisodes } from "../../api/podcast";

// Types
import { IPodcast } from "../../types/podcast";
import { PlayerActionType } from "../../types/player";

// Global Store - Context API
import { playerStore } from "../../store/player";

// import local assets and css
import podcastDefaultImg from "../../assets/Img/podcast-default.jpg";
import "./style.css";

/**
 *
 * @param {podcast} a podcast object for a show or an episode
 * @return {JSX} returns the JSX for creating a single card of podcast object
 */

const PodcastCard = ({
  podcast,
  isEpisode = false,
  source = ""
}: {
  podcast: IPodcast;
  isEpisode: boolean;
  source: string;
}) => {
  // get the dispatch method for the global state from the context api
  const { dispatch } = useContext(playerStore);

  // set the display image for each card.
  // replace with default image when missing in API.
  const displayImg = podcast.imageUrl || podcastDefaultImg;

  // click handler for each card
  // this will dispatch the appropriate action based on the type of card
  // in case of an episode card, it will dispatch a play action
  // play action will result in media player starting in play mode for that episode
  // in case of a podcast card, first retrieves the episodes related to the podcast
  // then dispatches the update action to store the episode list and the current podcast
  // also set the modal's display to true, which brings up the modal with the episode list
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
    <div className={`${source} card`} onClick={onClickCard}>
      <img
        className={`${source} card-image`}
        src={displayImg}
        alt="podcast logo"
      />
      <div className={`${source} card-title`}>{podcast.title}</div>
    </div>
  ) : null;
};

export default PodcastCard;
