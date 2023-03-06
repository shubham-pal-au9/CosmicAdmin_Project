const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get View Players List

router.post("/history", (req, res, next) => {
  if (req.headers.authorization) {
    const theToken = req.headers.authorization;
    console.log("Token:", theToken);
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    if (decoded) {
      db.query(
        "SELECT * FROM admin_panel where id=?",
        decoded.id,
        function (error, results, fields) {
          const token = jwt.sign(
            { id: results[0].id },
            "the-super-strong-secrect",
            {
              expiresIn: "2h",
            }
          );
          if (error) throw error;
          var query =
            "SELECT bld_purchase_history.id,bld_purchase_history.payment_intent_id,bld_purchase_history.user_id,bld_purchase_history.bld_token,bld_purchase_history.amount,bld_purchase_history.created_at,users.user_name,users.email FROM bld_purchase_history INNER JOIN users ON bld_purchase_history.user_id=users.user_id";
          if (req.body.searchValue) {
            query += ` where bld_purchase_history.payment_intent_id LIKE "${req.body.searchValue}" OR bld_purchase_history.user_id LIKE "${req.body.searchValue}" OR bld_purchase_history.bld_token LIKE "${req.body.searchValue}" OR bld_purchase_history.amount LIKE "${req.body.searchValue}" OR users.user_name LIKE "${req.body.searchValue}" OR users.email LIKE "${req.body.searchValue}"`;
          }
          db.query(query, function (err, joinData) {
            if (err) {
              console.log(err);
            } else {
              if (error) throw error;
              for (let i = 0; i < joinData.length; i++) {
                joinData[i].S_No = i + 1;
                joinData[i].token = token;
                console.log("Check Data:", joinData[i]);
              }
              console.log("token55:", token);
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
