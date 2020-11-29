import express, { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";

const uploadRouter: Router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const filetypes = /jpg|jpeg|png/;
  const extension = filetypes.test(file.originalname.toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extension && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images with extension jpg, jpeg or png only!"));
  }
}

const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

uploadRouter
  .route("/")
  .post(uploadImage.single("imageName"), (req: Request, res: Response) => {
    res.send(`/${req.file.path}`);
  });

export default uploadRouter;
