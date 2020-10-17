import { IPodcast } from "./podcast";

export enum PlayerActionType {
    play = "play",
    pause = "pause",
    update = "update"
}

export interface IPlayerAction {
    type: PlayerActionType,
    payload?: {
        currentShowId?: string | null,
        currentEpisode?: IPodcast | null,
        episodes?: IPodcast[] | null 
    }
}

export interface IPlayer {
    currentShowId: string | null,
    currentEpisode: IPodcast | null,
    episodes: IPodcast[] | null,
    media: boolean
}
