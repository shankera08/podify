import { Reducer } from "react";

// Types
import { PlayerActionType, IPlayer, IPlayerAction } from "../types/player";

export const playerReducer: Reducer<IPlayer, IPlayerAction> = ( state, action ) => {
    switch (action.type) {
        case PlayerActionType.play:
            if (action.payload && action.payload.currentEpisode) {
                return {...state, currentEpisode: action.payload.currentEpisode, media: true};
            } else {
                return {...state, media: true};
            }
        case PlayerActionType.pause:
            return {...state, media: false};
        case PlayerActionType.update:
            if (action.payload && action.payload.currentShowId && action.payload.episodes) {
                return {...state, currentShowId: action.payload.currentShowId,  episodes: action.payload.episodes};
            } else {
                return state;
            }
        default:
            return state;
    };
};
