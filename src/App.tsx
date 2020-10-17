import React, { useState, useEffect, useContext } from 'react';
import './App.css';

import Podcasts from "./components/Podcasts";
import { getCuratedList, getShows } from "./api/podcast";

// Types
import { IPodcast, ICuratedPodcasts } from "./types/podcast";
import { PlayerActionType } from "./types/player";

import { playerStore } from "./store/player";

function App() {
  const [curatedList, setCuratedList] = useState<IPodcast[] | null>(null);
  const [curatedShows, setCuratedShows] = useState<ICuratedPodcasts | null>(null);
  const playerState = useContext(playerStore);

  useEffect(() => {
    getCuratedList("US", 3)
    .then (categories => {
      setCuratedList(categories);
    })
    .catch(error => {
      throw error;
    })
  }, []);

  useEffect( () => {
    if (curatedList) {
      let shows: ICuratedPodcasts | null = null;

      for (let i = 0; i < curatedList.length; i++) {
        getShows(curatedList[i].id, 10)
        .then(showsList => {
          if (showsList) {
            
            shows = {...shows, [curatedList[i].title]: showsList};
            if (i === curatedList.length - 1) {
              setCuratedShows(shows);
            }
            
            return shows;
          } else {
            return null;
          }
        })
        .catch((error) => {
          throw error;
        })
      }
    }
  }, [curatedList]);

  const play = () => {
    playerState.dispatch({type: PlayerActionType.play});
  }

  const pause = () => {
    playerState.dispatch({type: PlayerActionType.pause});
  }

  const currentSource = playerState.state.currentEpisode ? `https://api.spreaker.com/v2/episodes/${playerState.state.currentEpisode.id}/play` : ""

  const audioControls:HTMLMediaElement = new Audio(currentSource);
  if (audioControls) {
    if (playerState.state.media){
     audioControls.play();
    }
    else {
      audioControls.pause();
    }
  }

  return (
      <div className="App">
        <header className="App-header">
          Podify - The Podcast App
        </header>
        <div className="podcast-curated">
          {curatedShows && Object.keys(curatedShows).map((title: string) => {
            console.log("Category Shows");
            console.log(curatedShows);
            if (curatedShows[title]){
              const show = curatedShows[title];
              if (show) {
                return (
                  <div className="category">
                    <div className="category__title">
                      {title}
                    </div>
                    <div className="category-podcasts">
                      {Podcasts(show)}
                    </div>
                  </div>
                  );
              } else {
                return null;
              }
            }
            })}
        </div>
        <div className="player">
        <div className="player__icons">
          <div className="play__icon"><i className="fas fa-play" onClick={()=>{play()}}></i></div>
          <div className="pause__icon"><i className="fas fa-pause" onClick={()=>{pause()}}></i></div>
        </div>
        <div className="player__title">
          Now Playing: {playerState.state.currentEpisode?.title}
        </div>
        </div>
      </div>
  );
}

export default App;
