const db = require("../config/db");

exports.getProjects = (callback) => {

    const query =
        "SELECT * FROM projects";

    db.query(query, callback);

};

exports.createProject = (
    name,
    description,
    createdBy,
    callback
) => {

    const query = `
        INSERT INTO projects
        (name, description, created_by)
        VALUES (?, ?, ?)
    `;

    db.query(
        query,
        [name, description, createdBy],
        callback
    );

};