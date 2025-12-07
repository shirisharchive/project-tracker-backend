const noticeSVC = require("../services/notice.service");
const Notice = require("../model/notice.model");

class NoticeController {

    postNotice = async (req, res, next) => {
        try {
            const validatedData = await noticeSVC.uploadNotice({
                ...req.body,
                image: req.file ? req.file.path : null
            });

            const newNotice = new Notice(validatedData);
            const savedNotice = await newNotice.save();

            return res.status(201).json({
                message: "Notice created successfully",
                data: savedNotice
            });

        } catch (error) {
            next(error);
        }
    };

    getNotice = async (req, res, next) => {
        try {
            const notices = await Notice.find().sort({ createdAt: -1 });

            return res.status(200).json({
                message: "Notices fetched successfully",
                data: notices
            });

        } catch (error) {
            next(error);
        }
    };

    deleteNotice = async (req, res, next) => {
        try {
            const id = req.params.id;

            const notice = await Notice.findByIdAndDelete(id);

            if (!notice) {
                return res.status(404).json({ message: "Notice not found" });
            }

            return res.status(200).json({
                message: "Notice deleted successfully"
            });

        } catch (error) {
            next(error);
        }
    };

    updateNotice = async (req, res, next) => {
        try {
            const id = req.params.id;
            const imagePath = req.file ? req.file.path : undefined;

            const updates = {
                ...req.body,
                ...(imagePath && { image: imagePath })
            };

            const updated = await Notice.findByIdAndUpdate(id, updates, { new: true });

            if (!updated) {
                return res.status(404).json({ message: "Notice not found" });
            }

            return res.status(200).json({
                message: "Notice updated successfully",
                data: updated
            });

        } catch (error) {
            next(error);
        }
    };

}

const noticeCTRL=new NoticeController();
module.exports=noticeCTRL
