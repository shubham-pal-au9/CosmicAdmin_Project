const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get Total Users Count

router.get("/getTotalUsers", (req, res, next) => {
  if (req.headers.authorization) {
    const theToken = req.headers.authorization;
    console.log("Token:", theToken);
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    console.log("CheckData5555:", decoded);
    if (decoded) {
      db.query(
        "SELECT * FROM admin_panel where id=?",
        decoded.id,
        function (error, results, fields) {
          if (error) throw error;
          const token = jwt.sign(
            { id: results[0].id },
            "the-super-strong-secrect",
            {
              expiresIn: "2h",
            }
          );
          db.query(
            "SELECT count(user_id) as TotalUserCount FROM users",
            function (err, countres) {
              if (err) {
                console.log(err);
              } else {
                var send_data = countres;

                const resObj = {};
                resObj.token = token;
                send_data.push(resObj);

                console.log("sendData55:", send_data);
                //send_data[0].newToken = tokenCount;
                res.json(send_data);
              }
            }
          );
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
