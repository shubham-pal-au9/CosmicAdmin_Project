const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = new express.Router();
const multer = require("multer");
const moment = require("moment");

// img storage confing
var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("only image is allowd"));
  }
};

var upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

router.post(
  "/characterNew",
  upload.single("photo"),
  signupValidation,
  (req, res, next) => {
    if (req.headers.authorization) {
      const { filename } = req.file;
      const theToken = req.headers.authorization;
      console.log("FielName:", req.file);
      const decoded = jwt.verify(theToken, "the-super-strong-secrect");
      console.log("decoded:", decoded);
      db.query(
        "SELECT * FROM admin_panel where id=?",
        decoded.id,
        function (error, results, fields) {
          if (error) throw error;
          db.query(
            `INSERT INTO character_master(character_name,character_image,character_type,is_paid,amount,item_type,character_description,character_shield) values
          (${db.escape(req.body.character_Name)},${db.escape(
              filename
            )},${db.escape(req.body.character_type)},${db.escape(
              req.body.is_paid
            )},${db.escape(req.body.amount)},${db.escape(
              req.body.item_type
            )},${db.escape(req.body.character_description)},${db.escape(
              req.body.character_shield
            )});`,
            function (err, statusRes) {
              if (err) {
                console.log(err);
              } else {
                var send_data = statusRes;
                res.json(send_data);
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
  }
);

// Get Character list data

router.get("/getplayerCharcters", (req, res, next) => {
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
        db.query("SELECT * FROM character_master", function (err, countres) {
          if (err) {
            console.log(err);
          } else {
            var send_data = countres;
            res.json(send_data);
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

// Delete character list data

router.post("/deleteCharacter", (req, res, next) => {
  if (req.headers.authorization) {
    const theToken = req.headers.authorization;
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    db.query(
      "SELECT * FROM admin_panel where id=?",
      decoded.id,
      function (error, results, fields) {
        if (error) throw error;
        db.query(
          `DELETE FROM character_master WHERE id =${db.escape(req.body.id)}`,
          function (err, countres) {
            if (err) {
              console.log(err);
            } else {
              var send_data = countres;
              res.json(send_data);
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

// Edit character from Character master

router.post(
  "/editCharacters",
  upload.single("photo"),
  signupValidation,
  (req, res, next) => {
    if (req.headers.authorization) {
      const { filename } = req.file;
      const theToken = req.headers.authorization;
      console.log("FielName:", req.file);
      const decoded = jwt.verify(theToken, "the-super-strong-secrect");
      console.log("decoded:", decoded);
      db.query(
        "SELECT * FROM admin_panel where id=?",
        decoded.id,
        function (error, results, fields) {
          if (error) throw error;
          db.query(
            `UPDATE character_master SET character_name=${db.escape(
              req.body.character_Name
            )},character_image=${db.escape(filename)},
            character_type=${db.escape(req.body.character_type)},
            is_paid=${db.escape(req.body.is_paid)},
            amount=${db.escape(req.body.amount)},
            item_type=${db.escape(req.body.item_type)},
            character_description=${db.escape(req.body.character_description)},
            character_shield=${db.escape(req.body.character_shield)}
            WHERE id=${db.escape(req.body.id)}`,
            function (err, statusRes) {
              if (err) {
                console.log(err);
              } else {
                var send_data = statusRes;
                res.json(send_data);
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
  }
);

module.exports = router;
