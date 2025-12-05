const projectSVC = require("../services/project.status");
const Project = require("../model/project.schema");

class ProjectController {

    /**
     * ✔ CREATE PROJECT
     */
    validateProject = async (req, res, next) => {
        try {
            // 1. Validate incoming data with JOI
            const validatedData = await projectSVC.addProject(req.body);

            // 2. Check for existing ID or Title manually (recommended)
            const exists = await Project.findOne({
                $or: [{ id: validatedData.id }, { title: validatedData.title }]
            });

            if (exists) {
                return res.status(400).json({
                    message: "Project ID or Title already exists."
                });
            }

            // 3. Save project
            const newProject = new Project(validatedData);
            const savedProject = await newProject.save();

            res.status(201).json({
                message: "Project successfully added.",
                project: savedProject
            });
        }
        catch (error) {

            // Handle Mongo duplicate key errors (11000)
            if (error.code === 11000) {
                return res.status(400).json({
                    message: "Duplicate value found.",
                    duplicate_field: Object.keys(error.keyPattern)
                });
            }

            next(error);
        }
    };



    /**
     * ✔ GET COMPLETED PROJECTS
     */
    getCompletedProjects = async (req, res, next) => {
        try {
            const completedProjects = await Project.find({ status: 'completed' })
                .sort({ year: -1, createdAt: -1 });

            res.status(200).json({
                message: "Completed projects retrieved successfully.",
                projects: completedProjects   // FIXED (previously wrong)
            });
        }
        catch (error) {
            next(error);
        }
    };



    /**
     * ✔ GET ONGOING PROJECTS
     */
    getOngoingProjects = async (req, res, next) => {
        try {
            const ongoingProjects = await Project.find({ status: 'ongoing' })
                .sort({ year: -1, createdAt: -1 });

            res.status(200).json({
                message: "Ongoing projects retrieved successfully.",
                projects: ongoingProjects
            });
        }
        catch (error) {
            next(error);
        }
    };



    /**
     * ✔ UPDATE PROJECT
     * Route example → PUT /admin/updateProject/:id
     */
    updateProject = async (req, res, next) => {
        try {
            const projectId = req.params.id;

            // Validate updated data with JOI
            const validatedData = await projectSVC.addProject(req.body);

            const updatedProject = await Project.findOneAndUpdate(
                { id: projectId },
                validatedData,
                { new: true }
            );

            if (!updatedProject) {
                return res.status(404).json({
                    message: "Project not found."
                });
            }

            res.status(200).json({
                message: "Project updated successfully.",
                project: updatedProject
            });
        }
        catch (error) {
            next(error);
        }
    };



    /**
     * ✔ DELETE PROJECT
     * Route example → DELETE /admin/deleteProject/:id
     */
    deleteProject = async (req, res, next) => {
        try {
            const projectId = req.params.id;

            const deleted = await Project.findOneAndDelete({ id: projectId });

            if (!deleted) {
                return res.status(404).json({
                    message: "Project not found."
                });
            }

            res.status(200).json({
                message: "Project deleted successfully.",
                project: deleted
            });
        }
        catch (error) {
            next(error);
        }
    };

}

const projectCTRL = new ProjectController();
module.exports = projectCTRL;
