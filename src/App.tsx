import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PlayerProvider } from "./context/player";

function App() {
  return (
    <PlayerProvider>
      <div className="App">
        <header className="App-header">
          Podify - The Podcast App
        </header>
      </div>
    </PlayerProvider>
  );
}

export default App;
