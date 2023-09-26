const multer = require("multer");
const path = require("path");


module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb)=>{
        const ext = path.extname(file.orignalname);
        if (ext !== '.jpg' || ext !=='.png' || ext !=='.jpeg') {
            cb(new Error(), false);
            return;
        }
        cb(null, true)
    }
})