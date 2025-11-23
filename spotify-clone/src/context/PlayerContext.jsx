import { createContext, useState, useRef, useEffect } from "react";
import axios from "axios";

const url = "http://127.0.0.1:8000";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [songData, setSongData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const [time, setTime] = useState({
    currentTime: { minutes: 0, seconds: 0 },
    totalTime: { minutes: 0, seconds: 0 },
  });

  // PLAY
  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => setPlayStatus(true));
  };

  // PAUSE
  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // PLAY BY ID
  const playWithId = (id) => {
    const selectedTrack = songData.find((item) => item._id === id);
    if (selectedTrack) {
      setTrack(selectedTrack);
      setPlayStatus(true);
    }
  };

  // PREVIOUS
  const previous = () => {
    if (!track) return;

    const index = songData.findIndex((item) => item._id === track._id);
    if (index > 0) {
      setTrack(songData[index - 1]);
      setPlayStatus(true);
    }
  };

  // NEXT
  const next = () => {
    if (!track) return;

    const index = songData.findIndex((item) => item._id === track._id);
    if (index < songData.length - 1) {
      setTrack(songData[index + 1]);
      setPlayStatus(true);
    }
  };

  // AUTO PLAY AFTER SONG LOAD
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const load = () => {
      audio.play().catch(() => {});
      setPlayStatus(true);
    };

    audio.addEventListener("loadedmetadata", load);
    return () => audio.removeEventListener("loadedmetadata", load);
  }, [track]);

  // SEEK (TAP ON BAR)
  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;

    const rect = seekBg.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const newTime = (clickX / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  // UPDATE PROGRESS BAR + TIME
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!audio.duration || !seekBar.current) return;

      const progress = (audio.currentTime / audio.duration) * 100;

      // GREEN BAR WIDTH
      seekBar.current.style.width = `${progress}%`;
      console.log("current:", audio.currentTime, "duration:", audio.duration);


      // CLOCK UPDATE
      setTime({
        currentTime: {
          minutes: Math.floor(audio.currentTime / 60),
          seconds: Math.floor(audio.currentTime % 60),
        },
        totalTime: {
          minutes: Math.floor(audio.duration / 60),
          seconds: Math.floor(audio.duration % 60),
        },
      });
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  // FETCH SONGS
  const getSongsData = async () => {
    try {
      const res = await axios.get(`${url}/api/song/list`);
      setSongData(res.data.songs || []);
      if (res.data.songs?.length > 0) {
        setTrack(res.data.songs[0]);
      }
    } catch (error) {
      console.error("Song Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // FETCH ALBUMS
  const getAlbumsData = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      setAlbumsData(res.data.albums || []);
    } catch (err) {
      console.error("Album Fetch Error:", err);
    }
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songData,
    albumsData,
    loading,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;


