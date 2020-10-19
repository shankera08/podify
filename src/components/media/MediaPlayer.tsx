import React, { useContext, useEffect, useRef } from "react";

import { PlayerActionType } from "../../types/player";

// Types
import { playerStore } from "../../store/player";

import "./style.css";

const MediaPlayer = () => {
    const playerState = useContext(playerStore);
    const mediaRef = useRef<HTMLMediaElement>(null);

    useEffect(() => {
        if (playerState.state.media) {
            if (mediaRef.current) {
                mediaRef.current.play();
            }
        } else {
            if (mediaRef.current) {
                mediaRef.current.pause();
            }
        }
    }, [playerState.state.media, playerState.state.currentEpisode]);

    const getMediaSource = () => {
        return playerState.state.currentEpisode
            ? `https://api.spreaker.com/v2/episodes/${playerState.state.currentEpisode.id}/play`
            : "";
    };

    const play = () => {
        playerState.dispatch({ type: PlayerActionType.play });
    };

    const pause = () => {
        playerState.dispatch({ type: PlayerActionType.pause });
    };

    return (
        <div>
            <audio ref={mediaRef} src={getMediaSource()}></audio>
            {playerState.state.currentEpisode && (
                <div className="player">
                    <div className="player__icons">
                        <div className="player__icons-play">
                            <i
                                className="player-fa fas fa-play"
                                onClick={play}
                            ></i>
                        </div>
                        <div className="player__icons-pause">
                            <i
                                className="player-fa fas fa-pause"
                                onClick={pause}
                            ></i>
                        </div>
                    </div>
                    <div className="player__title">
                        Now Playing: {playerState.state.currentEpisode?.title}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaPlayer;
