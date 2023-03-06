const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get View Players List

router.post("/gettournaments", (req, res, next) => {
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
        var query = "select * from tournament";
        if (req.body.searchValue) {
          query += ` where tournament_name LIKE "${req.body.searchValue}" OR tournament_type LIKE "${req.body.searchValue}" OR tournament_status LIKE "${req.body.searchValue}" OR tournament_score LIKE "${req.body.searchValue}" OR killed LIKE "${req.body.searchValue}" OR diamonds LIKE "${req.body.searchValue}"`;
        }

        if (req.body.page) {
          const limit = 6;
          const page = req.body.page;
          const offset = (page - 1) * limit;
          // query for fetching data with page number and offset

          query += ` limit ${limit} OFFSET ${offset} `;
        }

        db.query(query, function (err, tourRes) {
          if (err) {
            console.log(err);
          } else {
            res.send(tourRes);
          }
        });
      }
    );
  } else {
    res.status(422).json({
      message: "Please provide the token",
    });
  }
});

module.exports = router;
