import { Reducer } from "react";
import { IPlayer, IPlayerAction } from "../types/player";

export const playerReducer: Reducer<IPlayer, IPlayerAction> = ( state, action ) => {
    switch (action.type) {
        case "play":
            return {...state, media: 1};
        case "pause":
            return {...state, media: 0};
        default:
            return state;
    };
};
