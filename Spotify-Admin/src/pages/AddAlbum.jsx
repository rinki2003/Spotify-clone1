import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { url } from '../App.jsx'

const AddAlbum = () => {
    const [image, setImage] = useState(null);
    const [color, setColor] = useState('#121212');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('bgColor', color);

            const response = await axios.post(`${url}/api/album/add`, formData);

            if (response.data.success) {
                toast.success('Album added successfully');
                setName('');
                setDesc('');
                setImage(null);
                setColor('#121212');
            } else {
                toast.error('Something went wrong');
            }
        } catch (err) {
            toast.error('Error occurred while adding album');
        }
        setLoading(false);
    }

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
    ) : (
        <div className='pl-7'> {/* Adjust this padding to match your sidebar width */}
            <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
                <div className='pl-4 flex flex-col gap-4'>
                    <p>Upload Image</p>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
                    <label htmlFor="image">
                        <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                </div>

                <div className='flex flex-col gap-2.5'>
                    <p>Album Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name}
                        className='bg-transparent outline-green border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' 
                        type="text" 
                        placeholder='type here'
                    />
                </div>

                <div className='flex flex-col gap-2.5'>
                    <p>Album Description</p>
                    <input onChange={(e) => setDesc(e.target.value)} value={desc}
                        className='bg-transparent outline-green border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' 
                        type="text" 
                        placeholder='type here'
                    />
                </div>

                <div className='flex flex-col gap-3'>
                    <p>BackGround Color</p>
                    <input onChange={(e) => setColor(e.target.value)} value={color} type="color" />
                </div>

                <button className='text-base bg-black py-2.5 px-14 cursor-pointer' type='submit'>ADD</button>
            </form>
        </div>
    )
}

export default AddAlbum;
