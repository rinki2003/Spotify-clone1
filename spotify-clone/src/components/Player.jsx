import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

  const { 
    seekBar, 
    seekBg, 
    playStatus, 
    play, 
    pause, 
    track, 
    time,
    previous,
    next,
    seekSong
  } = useContext(PlayerContext);

  return track ? (
    <div className='fixed bottom-0 left-0 w-full h-[10%] bg-black flex items-center text-white px-4'>

      {/* LEFT SECTION */}
      <div className='flex items-center gap-4 w-1/3'>
        <img className='w-12 rounded' src={track.image} alt="" />
        <div>
          <p className='font-semibold'>{track.name}</p>
          <p className='text-sm text-gray-400'>{track.desc?.slice(0, 12)}</p>
        </div>
      </div>

      {/* CENTER SECTION */}
      <div className='flex flex-col items-center gap-2 w-1/3'>
        <div className='flex gap-4 items-center'>

          <img className='w-4 cursor-pointer' src={assets.shuffle_icon} />

          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} />

          {/* PLAY / PAUSE */}
          {playStatus ? (
            <img 
              onClick={pause} 
              className='w-4 cursor-pointer' 
              src={assets.pause_icon} 
            />
          ) : (
            <img 
              onClick={play} 
              className='w-4 cursor-pointer' 
              src={assets.play_icon} 
            />
          )}

          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} />

          <img className='w-4 cursor-pointer' src={assets.loop_icon} />
        </div>

        {/* SEEK BAR */}
       <div className="flex items-center gap-5 w-full justify-center text-sm">

  <p>
    {time.currentTime.minutes}:{time.currentTime.seconds.toString().padStart(2, "0")}
  </p>

  <div
    ref={seekBg}
    onClick={seekSong}
    className="relative w-[80%] bg-gray-600 h-1 rounded-full cursor-pointer"
  >
    <div
      ref={seekBar}
      className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
      style={{ width: "0%" }}
    ></div>
  </div>

  <p>
    {time.totalTime.minutes}:{time.totalTime.seconds.toString().padStart(2, "0")}
  </p>

</div>

      </div>

      {/* RIGHT SECTION */}
      <div className='hidden lg:flex items-center gap-2 opacity-75 w-1/3 justify-end'>
        <img className='w-4' src={assets.plays_icon} />
        <img className='w-4' src={assets.mic_icon} />
        <img className='w-4' src={assets.queue_icon} />
        <img className='w-4' src={assets.speaker_icon} />
        <img className='w-4' src={assets.volume_icon} />
        <div className='w-20 bg-slate-50 h-1 rounded'></div>
        <img className='w-4' src={assets.mini_player_icon} />
        <img className='w-4' src={assets.zoom_icon} />
      </div>

    </div>
  ) : null
}

export default Player
