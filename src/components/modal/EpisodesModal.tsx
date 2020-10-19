import React, { useContext, useEffect, useRef } from "react";

// Internal imports
import Episodes from "../episodes/Episodes";

// Global State - Context API
import { playerStore } from "../../store/player";

// Types
import { PlayerActionType } from "../../types/player";

import "./style.css";

/**
 *
 * @param {podcastRef} ref to the podcast container
 * @returns {JSX} return JSX for the modal with the episodes list
 */
const EpisodesModal = ({
  podcastRef
}: {
  podcastRef: React.RefObject<HTMLDivElement>;
}) => {
  // get the global store object
  const playerState = useContext(playerStore);
  // ref to the modal container
  const episodeModalRef = useRef<HTMLDivElement>(null);

  // onClick handler for close icon
  const onClose = () => {
    if (episodeModalRef.current) {
      episodeModalRef.current.style.display = "none";
    }

    // dispatch the action to set the display for modal to false
    // to ensure that it stay invisible in future rerenders
    playerState.dispatch({
      type: PlayerActionType.display,
      payload: {
        displayEpisodesModal: false
      }
    });
  };

  useEffect(() => {
    // detect click outside of the modal in order to close it
    const onClickOutside = (event: MouseEvent) => {
      const currentTarget = event.target as HTMLDivElement;

      // exclude the modal and the media player from triggering the close action
      if (
        podcastRef.current &&
        !podcastRef.current.contains(currentTarget) &&
        !currentTarget.className.includes("episodes-modal-content") &&
        !currentTarget.className.includes("player")
      ) {
        if (episodeModalRef.current) {
          episodeModalRef.current.style.display = "none";
        }
        playerState.dispatch({
          type: PlayerActionType.display,
          payload: {
            displayEpisodesModal: false
          }
        });
      }
    };

    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [podcastRef, playerState]);

  // reset the modal to display flex if the display flag or the new podcast is selected
  useEffect(() => {
    if (episodeModalRef.current && playerState.state.displayEpisodesModal) {
      episodeModalRef.current.style.display = "flex";
    }
  }, [playerState.state.displayEpisodesModal, playerState.state.episodes]);

  // TODO: fix css issues for this component
  return playerState.state.displayEpisodesModal ? (
    <div className="episodes-modal-background" ref={episodeModalRef}>
      <div className="episodes-modal-content__container">
        <div className="episodes-modal-content__header">
          <div className="episodes-modal-content__title">
            <div className="episodes-model-content__heading">
              {playerState.state.currentShow &&
                playerState.state.currentShow.title}
            </div>
            <div className="episodes-modal-content__subheading">Episodes</div>
          </div>
          <div className="episodes-modal-content__close" onClick={onClose}>
            <i className="episodes-modal-content__close-icon fas fa-times"></i>
          </div>
        </div>
        {playerState.state.episodes ? (
          <div className="episodes-modal-content__list">
            {Episodes(playerState.state.episodes, "episodes-modal-content")}
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default EpisodesModal;
