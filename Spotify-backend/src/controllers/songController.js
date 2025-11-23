import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import Song from '../models/songModel.js';

const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;

    if (!req.files || !req.files.audio || !req.files.image) {
      return res.status(400).json({ error: "Audio and Image files are required" });
    }

    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    // Upload audio to cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: 'video'
    });

    // Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image'
    });

    // Calculate duration min:sec
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

    // Create Song object
    const newSong = new Song({
      name,
      desc,
      album,
      file: audioUpload.secure_url,
      image: imageUpload.secure_url,
      duration
    });

    await newSong.save();

    // Delete local files after upload
    fs.unlinkSync(audioFile.path);
    fs.unlinkSync(imageFile.path);

    return res.status(201).json({
      success: true,
      message: "Song uploaded successfully",
      song: newSong
    });

  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: err.message
    });
  }
};

const listSong = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json({ success: true, songs });
  } catch (err) { 
    res.json({ success: false, message: "Failed to retrieve songs", error: err.message });
  }
};
const removeSong = async (req, res) => { 
        try{
          await Song.findByIdAndDelete(req.body.id);
          res.json({success:true,message:"song removed successfully"}); 

        } catch(err){
          res.json({success:false,message:"failed to remove song",error:err.message});
        }

}



export { addSong, listSong,removeSong };
