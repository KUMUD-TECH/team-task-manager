const userModel =
    require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/* SIGNUP */

exports.signup = (req, res) => {

    const {
        name,
        email,
        password,
        role
    } = req.body;

    userModel.findUserByEmail(
        email,
        async (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            if (result.length > 0) {
                return res
                    .status(400)
                    .json({
                        message:
                            "User already exists"
                    });
            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            userModel.createUser(
                name,
                email,
                hashedPassword,
                role,
                (err) => {

                    if (err) {
                        return res
                            .status(500)
                            .json(err);
                    }

                    res.json({
                        message:
                            "Signup successful"
                    });

                }
            );

        }
    );

};

/* LOGIN */

exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;

    userModel.findUserByEmail(
        email,
        async (err, result) => {

            if (err) {
                return res
                    .status(500)
                    .json(err);
            }

            if (result.length === 0) {
                return res
                    .status(404)
                    .json({
                        message:
                            "User not found"
                    });
            }

            const user =
                result[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Invalid password"
                    });
            }
console.log("JWT_SECRET:", process.env.JWT_SECRET);
            const token =
                jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"
                    }
                );

            res.json({
                message:
                    "Login successful",
                token,
                role: user.role
            });

        }
    );

};