const taskModel =
    require("../models/taskModel");



/* CREATE TASK */

exports.createTask = (req, res) => {

    const {
        title,
        description,
        due_date,
        project_id,
        assigned_to
    } = req.body;

    const created_by =
        req.user.id;

    taskModel.createTask(
        title,
        description,
        due_date,
        project_id,
        assigned_to,
        created_by,
        (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Task created successfully"
            });

        }
    );

};

/* GET TASKS */

exports.getTasksByProject =
    (req, res) => {

    const projectId =
        req.params.projectId;

    taskModel.getTasksByProject(
        projectId,
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

/* UPDATE STATUS */

exports.updateTaskStatus =
    (req, res) => {

    const taskId =
        req.params.taskId;

    const { status } =
        req.body;

    taskModel.updateTaskStatus(
        taskId,
        status,
        (err) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Status updated"
            });

        }
    );
};

/* DASHBOARD */

exports.getDashboardStats = (req, res) => {

    taskModel.getDashboardStats(
        (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            res.json(result[0]);

        }
    );

};