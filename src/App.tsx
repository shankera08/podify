import React, { useState, useEffect, useContext, useRef } from "react";

import Podcasts from "./components/podcast/Podcasts";
import MediaPlayer from "./components/media/MediaPlayer";
import EpisodesModal from "./components/modal/EpisodesModal";

import { getCuratedList, getShows } from "./api/podcast";
import { playerStore } from "./store/player";

// Types
import { IPodcast, ICuratedPodcasts } from "./types/podcast";

import "./App.css";

function App() {
  const [curatedList, setCuratedList] = useState<IPodcast[] | null>(null);
  const [curatedShows, setCuratedShows] = useState<ICuratedPodcasts | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCuratedList("US", 3)
      .then((categories) => {
        setCuratedList(categories);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  useEffect(() => {
    if (curatedList) {
      let shows: ICuratedPodcasts | null = null;

      for (let i = 0; i < curatedList.length; i++) {
        getShows(curatedList[i].id, 20)
          .then((showsList) => {
            if (showsList) {
              shows = { ...shows, [curatedList[i].title]: showsList };
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
          });
      }
    }
  }, [curatedList]);

  return (
    <div className="App">
      <header className="App-header">Podify - The Podcast App</header>
      <div className="podcast-curated" ref={modalRef}>
        {curatedShows &&
          Object.keys(curatedShows).map((title: string) => {
            if (curatedShows[title]) {
              const show = curatedShows[title];
              if (show) {
                return (
                  <div className="category">
                    <div className="category__title">{title}</div>
                    <div className="category-podcasts">{Podcasts(show)}</div>
                  </div>
                );
              } else {
                return null;
              }
            }
          })}
      </div>
      {EpisodesModal(modalRef)}
      {MediaPlayer()}
    </div>
  );
}

export default App;
