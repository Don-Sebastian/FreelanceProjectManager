const Project = require("../models/projectModels");

class ClientController {
  async getClientDetails(req, res) {
    const { email } = req.user;
    res.status(200).json({ user: email });
  }

  async postProjectRequirmentDetails(req, res) {
    const clientId = req.user._id;
    const { projectName, projectDescription, projectBudget, projectDuration } =
      req.body;

    try {
      const project = new Project({
        client: clientId,
        projectName,
        projectDescription,
        projectBudget,
        projectDuration,
      });

      await project.save();
      res
        .status(201)
        .json({ status: "success", message: "Project created successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async getProjectListOfClient(req, res) {
    const clientId = req.user._id;
    try {
      const projects = await Project.aggregate([
        {
          $match: {
            client: clientId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "applicants",
            foreignField: "_id",
            as: "applicantsDetails",
          },
        },
        {
          $project: {
            _id: 1,
            projectName: 1,
            projectDescription: 1,
            projectBudget: 1,
            projectDuration: 1,
            status: 1,
            createdAt: 1,
            "applicantsDetails._id": 1,
            "applicantsDetails.email": 1,
          },
        },
      ]);
      res.status(200).json({ status: "success", projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new ClientController();
