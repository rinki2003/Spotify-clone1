import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../App.jsx';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // for showing delete loader

  // Fetch albums from API
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error('Unable to fetch albums');
      }
    } catch (error) {
      toast.error('Error fetching albums');
    } finally {
      setLoading(false);
    }
  };

  // Remove album
  const removeAlbum = async (id) => {
    if (!window.confirm('Are you sure you want to delete this album?')) return;
    setDeletingId(id);
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAlbums(); // Refresh album list
      } else {
        toast.error('Failed to delete album');
      }
    } catch (error) {
      toast.error('Error occurred while deleting album');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8">
      <p className="text-lg font-bold mb-4">All Albums List</p>

      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 rounded-t">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Album Color</b>
        <b>Action</b>
      </div>

      {/* Album List */}
      {data.length === 0 ? (
        <p className="text-gray-500 mt-4">No albums found.</p>
      ) : (
        data.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 border border-gray-300 text-sm p-3 sm:p-2 mb-2 rounded"
          >
            <img
              className="w-16 sm:w-12 h-16 object-cover rounded"
              src={item.image}
              alt={`Album ${item.name}`}
            />
            <p className="truncate">{item.name}</p>
            <p className="truncate">{item.desc}</p>
            <input type="color" value={item.bgColor} readOnly className="w-10 h-6 border border-gray-300 rounded" />
            <button
              className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
              onClick={() => removeAlbum(item._id)}
              disabled={deletingId === item._id}
            >
              {deletingId === item._id ? 'Deleting...' : 'X'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ListAlbum;
