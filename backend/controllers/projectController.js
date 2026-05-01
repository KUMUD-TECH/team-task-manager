const projectModel =
    require("../models/projectModel");

/* CREATE PROJECT */

exports.createProject = (req, res) => {

    const { name, description } =
        req.body;

    const created_by =
        req.user.id;

    projectModel.createProject(
        name,
        description,
        created_by,
        (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Project saved in database",
                projectId:
                    result.insertId
            });

        }
    );

};

/* GET PROJECTS */

exports.getProjects = (req, res) => {

    projectModel.getProjects(
        (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            res.json(result);

        }
    );

};

/* ADD MEMBER */

exports.addMemberToProject =
    (req, res) => {

    const projectId =
        req.params.projectId;

    const { user_id } =
        req.body;

    projectModel.addMemberToProject(
        projectId,
        user_id,
        (err) => {

            if (err) {

                if (
                    err.code ===
                    "ER_DUP_ENTRY"
                ) {
                    return res
                        .status(400)
                        .json({
                            message:
                                "User already in project"
                        });
                }

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Member added to project"
            });

        }
    );

};