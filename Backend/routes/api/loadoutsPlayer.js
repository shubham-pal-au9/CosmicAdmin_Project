const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const { signupValidation, loginValidation } = require("../../valid");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get Total Users Count

router.post("/loadouts", (req, res, next) => {
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
          `SELECT weapon_master.id,weapon_master.weapon_name,weapon_master.weapon_descriptions ,weapon_master.type,weapon_master.item_type,weapon_master.weapon_image,weapon_master.weapon_accuracy,weapon_master.weapon_damage,weapon_master.weapon_range,weapon_master.weapon_fire_rate,weapon_master.is_paid,weapon_master.amount,users_buy_store_items.item_type FROM weapon_master INNER JOIN users_buy_store_items ON users_buy_store_items.item_id=weapon_master.id where users_buy_store_items.user_id =${req.body.user_id}`,
          function (err, countres) {
            if (err) {
              console.log(err);
            } else {
              var send_data = countres;
              //res.json(send_data);
              db.query(
                "SELECT weapon_master.id,weapon_name,weapon_descriptions,type,item_type,weapon_image,weapon_accuracy,weapon_damage,weapon_range,weapon_fire_rate,is_paid,amount from weapon_master where is_paid=0",
                function (err, subData) {
                  if (err) {
                    console.log(err);
                  } else {
                    const arr = [];
                    var send_Subdata = subData;
                    const resPlayer = send_data.concat(send_Subdata);

                    const uniqueIds = [];

                    const uniquePlayers = resPlayer.filter((element) => {
                      const isDuplicate = uniqueIds.includes(element.id);

                      if (!isDuplicate) {
                        uniqueIds.push(element.id);

                        return true;
                      }

                      return false;
                    });

                    res.json(uniquePlayers);
                  }
                }
              );
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
