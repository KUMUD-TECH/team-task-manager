const db = require("../config/db");

exports.getTasksByProject = (
    projectId,
    callback
) => {

    const query = `
        SELECT *
        FROM tasks
        WHERE project_id = ?
    `;

    db.query(
        query,
        [projectId],
        callback
    );

};

exports.updateTaskStatus = (
    taskId,
    status,
    callback
) => {

    const query =
        "UPDATE tasks SET status = ? WHERE id = ?";

    db.query(
        query,
        [status, taskId],
        callback
    );

};

exports.createTask = (
    title,
    description,
    dueDate,
    projectId,
    assignedTo,
    createdBy,
    callback
) => {

    const query = `
        INSERT INTO tasks
        (title, description,
         due_date, project_id,
         assigned_to, created_by)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            title,
            description,
            dueDate,
            projectId,
            assignedTo,
            createdBy
        ],
        callback
    );

};

/* DASHBOARD STATS */

exports.getDashboardStats = (callback) => {

    const query = `
        SELECT
            COUNT(*) AS totalTasks,

            SUM(
                CASE
                    WHEN status = 'Done'
                    THEN 1
                    ELSE 0
                END
            ) AS completedTasks,

            SUM(
                CASE
                    WHEN status != 'Done'
                    THEN 1
                    ELSE 0
                END
            ) AS pendingTasks,

            SUM(
                CASE
                    WHEN due_date < CURDATE()
                    AND status != 'Done'
                    THEN 1
                    ELSE 0
                END
            ) AS overdueTasks

        FROM tasks
    `;

    const db = require("../config/db");

    db.query(query, callback);

};