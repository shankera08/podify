import React, { useState, useEffect, useRef } from "react";

// Internal components
import Podcasts from "./components/podcast/Podcasts";
import MediaPlayer from "./components/media/MediaPlayer";
import EpisodesModal from "./components/modal/EpisodesModal";

// Methods for API calls
import { getCuratedList, getShows } from "./api/podcast";

// Types
import { IPodcast, ICuratedPodcasts } from "./types/podcast";

// Import the context provider
// to provide  access to the global state across the app
import { PlayerProvider } from "./context/player";

import "./App.css";

function App() {
  // local states for storing the curated list of podcasts and the shows under each category
  const [curatedList, setCuratedList] = useState<IPodcast[] | null>(null);
  const [curatedShows, setCuratedShows] = useState<ICuratedPodcasts[] | null>(
    null
  );

  // ref to the podcast container
  const podcastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // retrieve 3 curated lists of podcasts for US
    // TODO: make the country and the count dynamic based on user preferences
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
      // retrieve the shows under each category
      // TODO: get the number of shows, sorting etc from user preferences
      const showsPromise = curatedList.map((category) =>
        getShows(category.id, category.title, 20)
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
      <PlayerProvider>
        <header className="App-header">Podify - The Podcast App</header>
        <div className="podcast-curated" ref={podcastRef}>
          {curatedShows &&
            curatedShows.map((show) => {
              const showTitle = Object.keys(show)[0];
              const podcasts = show[showTitle];

              // create the podcast shows carousal for each category
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
        <EpisodesModal podcastRef={podcastRef} />
        <MediaPlayer />
      </PlayerProvider>
    </div>
  );
}

export default App;
