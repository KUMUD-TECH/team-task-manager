const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/users", (req, res) => {

    const query = "SELECT * FROM users";

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

module.exports = router;