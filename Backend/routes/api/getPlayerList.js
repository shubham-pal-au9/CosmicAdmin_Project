const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get View Players List

router.post("/getPlayersList", (req, res, next) => {
  if (req.headers.authorization) {
    const theToken = req.headers.authorization;
    console.log("Token:", theToken);
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    if (decoded) {
      db.query(
        "SELECT * FROM admin_panel where id=?",
        decoded.id,
        function (error, results, fields) {
          if (error) throw error;
          var query =
            "SELECT users.user_name,users.user_id ,users_info.full_name,users_info.coin,users_info.diamond FROM users INNER JOIN users_info ON users.user_id=users_info.user_id";
          if (req.body.searchValue) {
            query += ` where users.user_name LIKE "${req.body.searchValue}" OR users_info.full_name LIKE "${req.body.searchValue}" OR users_info.diamond LIKE "${req.body.searchValue}" OR users_info.coin LIKE "${req.body.searchValue}"`;
          }
          db.query(query, function (err, joinData) {
            if (err) {
              console.log(err);
            } else {
              if (error) throw error;
              const tokenCount = jwt.sign(
                { id: decoded.id },
                "the-super-strong-secrect",
                {
                  expiresIn: "30s",
                }
              );
              for (let i = 0; i < joinData.length; i++) {
                //joinData[i].image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2zCuhsEw0bjulyZS1UjFQ2l1hOj3V-ZAmnxyGgSiMpQ&s"
                joinData[i].S_No = i + 1;
                console.log("Check Data:", joinData[i]);
              }
              res.send(joinData);
            }
          });
        }
      );
    } else {
      return res.status(401).send(error);
    }
  } else {
    res.status(422).json({
      message: "Please provide the token",
    });
  }
});

module.exports = router;
