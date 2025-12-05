const fs=require("fs");
const path=require("path")
const multer=require("multer");



 //defining the file path->this will create path automatically.
const uploadDir = path.join(__dirname, "../uploads/notice");

// Auto create folder if missing
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


//diskStorage()->stores files on my server's file system
const storage=multer.diskStorage({

    destination: (req, file, cb) => cb(null, uploadDir),

    //providing unique name to uploaded file
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
        return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
};

const upload = multer
({ storage, 
    fileFilter,
    limits:{fileSize:2*1024*1024}//2mb size defined

});
module.exports=upload;