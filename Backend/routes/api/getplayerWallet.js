const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get Total Users Count

router.post("/players", (req, res, next) => {
  console.log("Incoming User:", req.headers.authorization);
  if (req.headers.authorization) {
    const theToken = req.headers.authorization;
    console.log("Token:", theToken);
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    console.log("decoded:", decoded);
    db.query(
      "SELECT * FROM admin_panel where id=?",
      decoded.id,
      function (error, results, fields) {
        if (error) throw error;
        db.query(
          `select * from user_game_diamond_transactions where user_id = ${req.body.user_id}`,
          function (err, countres) {
            if (err) {
              console.log(err);
            } else {
              if (countres.length > 0) {
                db.query(
                  `select diamond from users_info where user_id = ${req.body.user_id}`,
                  function (err, userData) {
                    if (err) {
                      console.log(err);
                    } else {
                      const send_data = countres;
                      send_data[0].totalDiamond = userData[0].diamond;
                      console.log("send_data", send_data);
                      res.json(send_data);
                    }
                  }
                );
              } else {
                res.json("Please check your user id!");
              }
            }
          }
        );
      }
    );
  } else {
    res.status(422).json({
      message: "Please provide the token",
    });
  }
});

module.exports = router;
