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

// Weapon loadout

router.post(
  "/weaponloadout",
  upload.single("photo"),
  signupValidation,
  (req, res, next) => {
    if (req.headers.authorization) {
      const { filename } = req.file;
      const theToken = req.headers.authorization;
      console.log("Token:", theToken);
      console.log("CheckDataForWeapons:", req.file, req.body);
      const decoded = jwt.verify(theToken, "the-super-strong-secrect");
      console.log("decoded:", decoded);
      db.query(
        "SELECT * FROM admin_panel where id=?",
        decoded.id,
        function (error, results, fields) {
          if (error) throw error;
          console.log("Results11:", results);
          db.query(
            `INSERT INTO weapon_master(weapon_name, weapon_descriptions,type,item_type,weapon_image,weapon_accuracy,weapon_damage,weapon_range,weapon_fire_rate
                    ,weapon_mobility,weapon_control,is_paid,amount) values(${db.escape(
                      req.body.weapon_name
                    )},${db.escape(req.body.weapon_descriptions)},${db.escape(
              req.body.type
            )},${db.escape(req.body.item_type)},${db.escape(
              filename
            )},${db.escape(req.body.weapon_accuracy)}
                    ,${db.escape(req.body.weapon_damage)},${db.escape(
              req.body.weapon_range
            )},${db.escape(req.body.weapon_fire_rate)},${db.escape(
              req.body.weapon_mobility
            )},${db.escape(req.body.weapon_control)},${db.escape(
              req.body.is_paid
            )},${db.escape(req.body.amount)});`,
            function (err, statusRes) {
              if (err) {
                console.log(err);
              } else {
                var send_data = statusRes;
                console.log("DataCheck12345:", send_data);
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

// Get Weapons list data

router.get("/getplayerWeapons", (req, res, next) => {
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
        db.query("SELECT * FROM weapon_master", function (err, countres) {
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

// Delete weapons list data

router.post("/deleteWeapons", (req, res, next) => {
  if (req.headers.authorization) {
    const theToken = req.headers.authorization;
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    db.query(
      "SELECT * FROM admin_panel where id=?",
      decoded.id,
      function (error, results, fields) {
        if (error) throw error;
        db.query(
          `DELETE FROM weapon_master WHERE id =${db.escape(req.body.id)}`,
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

// Edit API for Weapons master

router.post(
  "/editWeapons",
  upload.single("photo"),
  signupValidation,
  (req, res, next) => {
    if (req.headers.authorization) {
      const { filename } = req.file;
      const theToken = req.headers.authorization;
      console.log("Token:", theToken);
      console.log("CheckDataForWeapons:", req.file, req.body);
      const decoded = jwt.verify(theToken, "the-super-strong-secrect");
      console.log("decoded:", decoded);
      db.query(
        "SELECT * FROM admin_panel where id=?",
        decoded.id,
        function (error, results, fields) {
          if (error) throw error;
          console.log("Results11:", results);
          db.query(
            `UPDATE weapon_master SET weapon_name=${db.escape(
              req.body.weapon_name
            )},weapon_descriptions=${db.escape(
              req.body.weapon_descriptions
            )},type=${db.escape(req.body.type)},
            item_type=${db.escape(req.body.item_type)},
            weapon_image=${db.escape(filename)},
            weapon_accuracy=${db.escape(req.body.weapon_accuracy)},
            weapon_damage=${db.escape(req.body.weapon_damage)},
            weapon_range=${db.escape(req.body.weapon_range)},
            weapon_fire_rate=${db.escape(req.body.weapon_fire_rate)},
            weapon_mobility=${db.escape(req.body.weapon_mobility)},
            weapon_control=${db.escape(req.body.weapon_control)},
            is_paid=${db.escape(req.body.is_paid)},
            amount=${db.escape(req.body.amount)}
            WHERE id=${db.escape(req.body.id)};`,
            function (err, statusRes) {
              if (err) {
                console.log(err);
              } else {
                var send_data = statusRes;
                console.log("DataCheck12345:", send_data);
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
