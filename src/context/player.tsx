import React, {useReducer, Reducer} from 'react';

import { IPlayer, IPlayerAction } from "../types/player";
import { playerInitialState, playerStore} from "../store/player";
import { playerReducer } from "../reducer/player";

const { Provider } = playerStore;

export const PlayerProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<IPlayer, IPlayerAction>>(playerReducer, playerInitialState);

    return (
        <Provider value={{state, dispatch}}>
            {children}
        </Provider>
    );
};