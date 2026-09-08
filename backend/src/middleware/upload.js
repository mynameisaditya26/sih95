const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg','image/png','video/mp4','video/quicktime'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type'), false);
};
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 }, fileFilter });
module.exports = upload;
