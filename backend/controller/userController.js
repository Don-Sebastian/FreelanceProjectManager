const projectModels = require("../models/projectModels");

class UserController {
  async getUserDetails(req, res) {
    const { email } = req.user;
    res.status(200).json({ user: email });
  }

  async getAllActiveProducts(req, res) {
    try {
      const projects = await projectModels.aggregate([
        {
          $match: {
            status: "active",
          },
        },
        {
          $lookup: {
            from: "clients",
            localField: "client",
            foreignField: "_id",
            as: "client",
          },
        },
        {
          $unwind: "$client",
        },
        {
          $project: {
            _id: 1,
            projectName: 1,
            projectDescription: 1,
            projectBudget: 1,
            projectDuration: 1,
            client: {
              _id: "$client._id",
              email: "$client.email",
            },
          },
        },
      ]);
      res.status(200).json({ status: "success", projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getApplyForProject(req, res) {
    const userId = req.user._id;
    const { projectId } = req.params;

    try {
      const project = await projectModels.findById(projectId);
      if (project.status != "active")
        return res.status(400).json({ message: "Project is not active" });
      if (project.applicants.includes(userId))
        return res
          .status(400)
          .json({ message: "This project has already been applied" });
      project.applicants.push(userId);
      await project.save();
      res
        .status(200)
        .json({ status: "success", message: "Applied for this project" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
