"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extension = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extension && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error("Images with extension jpg, jpeg or png only!"));
    }
}
const uploadImage = multer_1.default({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
uploadRouter
    .route("/")
    .post(uploadImage.single("imageName"), (req, res) => {
    res.send(`/${req.file.path}`);
});
exports.default = uploadRouter;
