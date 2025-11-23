import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { url } from '../App.jsx';

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [album, setAlbum] = useState('none');
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('album', album);

      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success('Song added successfully');
        setName('');
        setDesc('');
        setAlbum('none');
        setImage(null);
        setSong(null);
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      toast.error('Error occurred while adding song');
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success && Array.isArray(response.data.albums)) {
        setAlbumData(response.data.albums);
      } else {
        setAlbumData([]); 
        toast.error('Unable to load album data');
      }
    } catch (error) {
      setAlbumData([]); 
      toast.error('Error occurred while loading albums');
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="pl-[4vw] flex justify-start">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
        {/* Upload Section */}
        <div className="flex gap-8">
          {/* Upload Audio */}
          <div className="flex flex-col gap-4">
            <p>Upload song</p>
            <input
              onChange={(e) => setSong(e.target.files[0])}
              type="file"
              id="song"
              accept="audio/*"
              hidden
            />
            <label htmlFor="song" className="flex items-center gap-2 cursor-pointer">
              <img
                src={song ? assets.upload_added : assets.upload_song}
                className="w-24"
                alt="Upload song"
              />
              {song && <p className="truncate text-sm">{song.name}</p>}
            </label>
          </div>

          {/* Upload Image */}
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              hidden
            />
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                className="w-24 cursor-pointer"
                alt="Upload cover"
              />
            </label>
          </div>
        </div>

        {/* Song Name */}
        <div className="flex flex-col gap-2.5">
          <p>Song name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            placeholder="Type Here"
            type="text"
            required
          />
        </div>

        {/* Song Description */}
        <div className="flex flex-col gap-2.5">
          <p>Song Description</p>
          <input
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            placeholder="Type Here"
            type="text"
            required
          />
        </div>

        {/* Album Select */}
        <div className="flex flex-col gap-2.5">
          <p>Album</p>
          <select
            onChange={(e) => setAlbum(e.target.value)}
            value={album}
            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
          >
            <option value="none">None</option>
            {Array.isArray(albumData) &&
              albumData.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddSong;
