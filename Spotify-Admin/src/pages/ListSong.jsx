import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../App.jsx';
import { toast } from 'react-toastify';

const ListSong = () => {
    const [data, setData] = useState([]);

    const fetchSongs = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            if (response.data.success) {
                setData(response.data.songs);
            }

        } catch (error) {
            toast.error('Error fetching songs');

        }
    };
 const removeSong = async (songId) => {
        try {
            const response = await axios.post(`${url}/api/song/remove`, { id: songId });
            if (response.data.success) {
                toast.success('Song removed successfully');
               await fetchSongs(); // Refresh the song list
            } 


 } catch (error) {
            toast.error('Error removing song');
        }    };







    useEffect(() => {
        fetchSongs();

    }, []); 

    return (
       <div className>
    <p>All Songs List</p>
    <br />
    <div>
        {}
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_0.5fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Album</b>
            <b>Duration</b>
            <b>Action</b>
        </div>

        {/* List of songs */}
        {data.map((item, index) => (
            <div
                key={index}
                className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_0.5fr_0.5fr_0.5fr] items-center gap-2.5 border border-gray-300 text-sm mr-5 p-2'
            >
                <img className='w-12' src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.album}</p>
                <p>{item.duration}</p>
                <p className='cursor-pointer' onClick={()=>removeSong(item._id)}> X</p>
            </div>
        ))}
    </div>
</div>

            );
};

            export default ListSong;
