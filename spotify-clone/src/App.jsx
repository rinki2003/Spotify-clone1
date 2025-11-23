import React, { useContext } from 'react';
import Sidebar from './components/sidebar.jsx';
import Player from './components/Player.jsx';
import Display from './components/Display.jsx';
import { PlayerContext } from './context/PlayerContext.jsx';




const App = () => {
  const { audioRef, track, songData, loading } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {loading ? (
        <div className="flex justify-center items-center h-full text-gray-700 text-xl font-semibold">
          Loading...
        </div>
      ) : songData.length !== 0 ? (
        <div className='h-[90%] flex'>
          <Sidebar />
          <Display />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full text-red-500 text-xl font-semibold">
          No songs available.
        </div>
      )}

      <Player />

      {track && (
        <audio 
          ref={audioRef} 
          src={track.file || null} 
          preload="auto"
          
        />
      )}
    </div>
    
  );
};

export default App;



