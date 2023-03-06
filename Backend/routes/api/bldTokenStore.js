const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get bldToekenStore

router.post("/getBldToken", (req, res, next) => {
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
          var query = "SELECT * from bld_token_store";
          if (req.body.searchValue) {
            query += ` where id LIKE "${req.body.searchValue}" OR item_type LIKE "${req.body.searchValue}" OR no_of_token LIKE "${req.body.searchValue}" OR price LIKE "${req.body.searchValue}"`;
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
                  expiresIn: "30m",
                }
              );
              for (let i = 0; i < joinData.length; i++) {
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

// Update BldTokenStore

router.post("/updateBldToken", (req, res, next) => {
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
        //console.log("Data77:", req.body.no_of_token, req.body.price);
        if (req.body.no_of_token != undefined && req.body.price == undefined) {
          db.query(
            `UPDATE bld_token_store SET no_of_token=${db.escape(
              req.body.no_of_token
            )} WHERE id=${db.escape(req.body.id)};`,
            function (err, statusRes) {
              if (err) {
                console.log(err);
              } else {
                var send_data = statusRes;
                res.send(send_data);
              }
            }
          );
        } else if (
          req.body.no_of_token == undefined &&
          req.body.price != undefined
        ) {
          if (req.body.price) {
            db.query(
              `UPDATE bld_token_store SET price=${db.escape(
                req.body.price
              )} WHERE id=${db.escape(req.body.id)};`,
              function (err, statusRes) {
                if (err) {
                  console.log(err);
                } else {
                  var send_data = statusRes;
                  res.send(send_data);
                }
              }
            );
          }
        } else {
          db.query(
            `UPDATE bld_token_store SET no_of_token=${db.escape(
              req.body.no_of_token
            )},price=${db.escape(req.body.price)} WHERE id=${db.escape(
              req.body.id
            )};`,
            function (err, statusRes) {
              if (err) {
                console.log(err);
              } else {
                var send_data = statusRes;
                res.send(send_data);
              }
            }
          );
        }
      }
    );
  } else {
    res.status(422).json({
      message: "Please provide the token",
    });
  }
});

// Delete BldTokenStore

router.post("/bldTokenDelete", (req, res, next) => {
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
          `DELETE FROM bld_token_store WHERE id=${db.escape(req.body.id)}`,
          function (err, statusRes) {
            if (err) {
              console.log(err);
            } else {
              var send_data = statusRes;
              res.send(send_data);
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

// Insert BldTokenStore

router.post("/bldTokenInsert", (req, res, next) => {
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
          `INSERT INTO bld_token_store(item_type,no_of_token,price) values(${db.escape(
            req.body.item_type
          )},${db.escape(req.body.no_of_token)},${db.escape(req.body.price)});`,
          function (err, statusRes) {
            if (err) {
              console.log(err);
            } else {
              var send_data = statusRes;
              res.send(send_data);
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
