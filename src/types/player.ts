import { IEpisode } from "./episode";

enum PlayerActionType {
    play = "play",
    pause = "pause"
}

export type IPlayerAction = {
    type: PlayerActionType
}

export type IPlayer = {
    episode: IEpisode | {},
    media: number
}