import React, { useContext, useEffect, useRef } from "react";

import Episodes from "../episodes/Episodes";
import { playerStore } from "../../store/player";

import { PlayerActionType } from "../../types/player";

import "./modal.css";

const EpisodesModal = (modalRef: React.RefObject<HTMLDivElement>) => {
  const playerState = useContext(playerStore);
  const episodeModalRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    if (episodeModalRef.current) {
      episodeModalRef.current.style.display = "none";
    }

    playerState.dispatch({
      type: PlayerActionType.display,
      payload: {
        displayEpisodesModal: false
      }
    });
  };

  const onClickOutside = (event: MouseEvent) => {
    const currentTarget = event.target as HTMLDivElement;
    if (
      modalRef.current &&
      !modalRef.current.contains(currentTarget) &&
      !currentTarget.className.includes("episodes-modal__")
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

  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    if (episodeModalRef.current && playerState.state.displayEpisodesModal) {
      episodeModalRef.current.style.display = "inline-block";
    }
  }, [playerState.state.displayEpisodesModal, playerState.state.episodes]);

  return (
    playerState.state.displayEpisodesModal && (
      <div className="episodes-modal" ref={episodeModalRef}>
        <div className="episodes-modal__container">
          <span className="episodes-modal__close" onClick={onClose}>
            &times;
          </span>
          <div className="episodes-modal__title">
            {playerState.state.currentShow &&
              playerState.state.currentShow.title}
          </div>
          {playerState.state.episodes ? (
            <div className="episodes-modal__list">
              {Episodes(playerState.state.episodes, "episodes-modal")}
            </div>
          ) : null}
        </div>
      </div>
    )
  );
};

export default EpisodesModal;
