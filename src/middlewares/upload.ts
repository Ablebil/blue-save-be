import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
];

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  console.log("Received file MIME type:", file.mimetype);

  const extname = path.extname(file.originalname).toLowerCase();
  const isAllowedExtension = /jpeg|jpg|png|mp4|mov|avi/.test(extname);
  const isAllowedMimeType = allowedMimeTypes.includes(file.mimetype);

  if (!isAllowedExtension) {
    return cb(new Error("Invalid file extension"));
  }

  if (!isAllowedMimeType) {
    return cb(new Error("Invalid MIME type"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

export default upload;
