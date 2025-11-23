
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import Navbar from './Navbar';
import { assets } from '../assets/assets';
const DisplayAlbum = (album) => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState({});

  const { playWithId, albumsData, songData } = useContext(PlayerContext);

  useEffect(() => {
    const selectedAlbum = albumsData.find((item) => item._id === id);
    if (selectedAlbum) {
      setAlbumData(selectedAlbum);
    }
  }, [albumsData, id]);
  if (!albumData) return <p className="text-white p-4">Album not found</p>;

  return albumData ?(
    <>
      <Navbar />

      {/* Album Header */}
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col">
          <p className="text-gray-400 uppercase text-sm mb-1">Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4 className="text-gray-300">{albumData.desc}</h4>
          <p className="mt-2 text-gray-400 text-sm flex items-center gap-2">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="Spotify Logo" />
            <b>Spotify</b> • 1,345,567 likes • <b>50 songs,</b> album 2hr 35 min
          </p>
        </div>
      </div>

      {/* Songs Table Header */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock" />
      </div>
      <hr className="border-gray-700 mb-2" />

      {/* Songs List */}
      {songData?.filter(item => item.album === albumData?.name).map((item, index) => (
  <div
    key={item._id || index}
    onClick={() => playWithId(item._id)}
    className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded"
  >
    {/* Song Info */}
    <p className="text-white flex items-center">
      <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
      <img className="inline w-10 mr-4 rounded" src={item.image} alt={item.name} />
      {item.name}
    </p>

    {/* Album Name */}
    <p className="text-[15px]">{albumData?.name}</p>

    {/* Date Added */}
    <p className="text-[15px] hidden sm:block">5 Days Ago</p>

    {/* Duration */}
    <p className="text-[15px] text-center">{item.duration}</p>
  </div>
      ))}
    </>
  ): null
};

export default DisplayAlbum;
