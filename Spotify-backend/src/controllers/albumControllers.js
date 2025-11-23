import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import Album from '../models/albumModel.js';

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image'
    });

    // Remove local file after upload
    fs.unlinkSync(imageFile.path);

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url
    };

    const album = new Album(albumData);
    await album.save();

    res.json({
      success: true,
      message: "Album added successfully",
      album
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Album upload failed",
      error: err.message
    });
  }
};

const listAlbum = async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json({ success: true, albums });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch albums", error: err.message });
  }
};

const removeAlbum = async (req, res) => {
  try {
    const albumId = req.body.id;
    if (!albumId) return res.status(400).json({ success: false, message: "Album id is required" });

    await Album.findByIdAndDelete(albumId);
    res.json({ success: true, message: "Album removed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to remove album", error: err.message });
  }
};

export { addAlbum, listAlbum, removeAlbum };
