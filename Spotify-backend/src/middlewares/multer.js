import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Make sure uploads folder exists
const uploadDir = path.join('uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
export default upload;

