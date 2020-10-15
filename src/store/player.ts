import {createContext, Dispatch} from "react";
import { IPlayer, IPlayerAction } from "../types/player";

export const playerInitialState: IPlayer = {
    episode: {},
    media: 0 // to track the state of the media player. 0 => pause and 1 => play
};

export const playerStore = createContext<{state: IPlayer, dispatch: Dispatch<IPlayerAction>}>({state: playerInitialState, dispatch: () => {}});