import React, { useState, useEffect, useRef } from "react";

import Podcasts from "./components/podcast/Podcasts";
import MediaPlayer from "./components/media/MediaPlayer";
import EpisodesModal from "./components/modal/EpisodesModal";

import { getCuratedList, getShows } from "./api/podcast";

// Types
import { IPodcast, ICuratedPodcasts } from "./types/podcast";

import "./App.css";

function App() {
  const [curatedList, setCuratedList] = useState<IPodcast[] | null>(null);
  const [curatedShows, setCuratedShows] = useState<ICuratedPodcasts[] | null>(
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
      const showsPromise = curatedList.map((category) =>
        getShows(category.id, category.title, 10)
      );

      Promise.all(showsPromise)
        .then((curated) => {
          if (curated) {
            setCuratedShows(
              curated.filter((show): show is ICuratedPodcasts => !!show)
            );
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [curatedList]);

  return (
    <div className="App">
      <header className="App-header">Podify - The Podcast App</header>
      <div className="podcast-curated" ref={modalRef}>
        {curatedShows &&
          curatedShows.map((show) => {
            const showTitle = Object.keys(show)[0];
            const podcasts = show[showTitle];

            if (podcasts) {
              return (
                <div className="category" key={showTitle}>
                  <div className="category__title">{showTitle}</div>
                  <div className="category-podcasts">
                    <Podcasts podcasts={podcasts} />
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
      <EpisodesModal modalRef={modalRef} />
      <MediaPlayer />
    </div>
  );
}

export default App;
