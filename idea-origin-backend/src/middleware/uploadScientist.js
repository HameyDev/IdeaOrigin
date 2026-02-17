import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/scientists/");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
    }

});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Only image files allowed", false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
