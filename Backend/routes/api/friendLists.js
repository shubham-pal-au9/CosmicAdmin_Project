const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

// Friend Lists

router.post("/friendLists", (req, res) => {
  if (req.headers.authorization) {
    const theToken = req.headers.authorization;
    var user_id = req.body.user_id;
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    if (decoded) {
      db.query(
        `select * from users where user_id=${user_id}`,
        (err, getUserDetails) => {
          if (err) {
            console.log("error: ", err);
            res.json(err);
            return;
          }
          if (getUserDetails && getUserDetails.length > 0) {
            db.query(
              `select * from friend_request where sender_id=${user_id} AND is_accepted = 0`,
              (err, getFriendPending) => {
                if (err) {
                  console.log("error: ", err);
                  res.json(err);
                  return;
                }
                if (getFriendPending && getFriendPending.length > 0) {
                  var friendDetails = {};
                  var accepted_arr = [];
                  var receiver_arr = [];

                  var getPending_highest = getFriendPending.length;

                  for (
                    let index = 0;
                    index < getFriendPending.length;
                    index++
                  ) {
                    db.query(
                      `select * from users where user_id=${getFriendPending[index].receiver_id}`,
                      (err, getReceiverDetails) => {
                        if (err) {
                          res.json(err);
                          return;
                        }
                        if (getReceiverDetails.length > 0) {
                          receiver_arr.push({
                            S_No: index + 1,
                            sender_name: getUserDetails[0].user_name,
                            sender_email: getUserDetails[0].email,
                            receiver_name: getReceiverDetails[0].user_name,
                            receiver_email: getReceiverDetails[0].email,
                            id: getFriendPending[index].id,
                            sender_id: getFriendPending[index].sender_id,
                            receiver_id: getFriendPending[index].receiver_id,
                            is_accepted: getFriendPending[index].is_accepted,
                            created_at: getFriendPending[index].created_at,
                          });

                          if (index === getPending_highest - 1) {
                            friendDetails.pending_request = receiver_arr;
                          }
                        }
                      }
                    );
                  }

                  db.query(
                    `select * from friend_request where sender_id=${user_id} AND is_accepted = 1`,
                    (err, getFriendAcceptedPre) => {
                      if (err) {
                        res.json(err);
                        return;
                      }
                      if (
                        getFriendAcceptedPre &&
                        getFriendAcceptedPre.length > 0
                      ) {
                        var highest = getFriendAcceptedPre.length;

                        for (
                          let index = 0;
                          index < getFriendAcceptedPre.length;
                          index++
                        ) {
                          db.query(
                            `select * from block_lists where sender_id=${getFriendAcceptedPre[index].sender_id} AND receiver_id=${getFriendAcceptedPre[index].receiver_id} AND is_blocked = 1`,
                            (err, getFriendBlockLists) => {
                              if (err) {
                                res.json(err);
                                return;
                              }
                              if (
                                getFriendBlockLists &&
                                getFriendBlockLists.length > 0
                              ) {
                                console.log("IfOne:", getFriendBlockLists);
                              } else {
                                db.query(
                                  `select * from friend_request where sender_id=${getFriendAcceptedPre[index].sender_id} AND receiver_id=${getFriendAcceptedPre[index].receiver_id} AND is_accepted = 1`,
                                  (err, getFriendAccepted) => {
                                    if (err) {
                                      console.log("error: ", err);
                                      res.json(err);
                                      return;
                                    }
                                    if (
                                      getFriendAccepted &&
                                      getFriendAccepted.length > 0
                                    ) {
                                      db.query(
                                        `select * from users where user_id=${getFriendAcceptedPre[index].receiver_id}`,
                                        (err, getAcceptedDetails) => {
                                          if (err) {
                                            console.log("error: ", err);
                                            res.json(err);
                                            return;
                                          }
                                          if (getAcceptedDetails.length > 0) {
                                            accepted_arr.push({
                                              S_No:
                                                friendDetails.pending_request[
                                                  getPending_highest - 1
                                                ].S_No +
                                                index +
                                                1,
                                              sender_name:
                                                getUserDetails[0].user_name,
                                              sender_email:
                                                getUserDetails[0].email,
                                              receiver_name:
                                                getAcceptedDetails[0].user_name,
                                              receiver_email:
                                                getAcceptedDetails[0].email,
                                              id: getFriendAcceptedPre[index]
                                                .id,
                                              sender_id:
                                                getFriendAcceptedPre[index]
                                                  .sender_id,
                                              receiver_id:
                                                getFriendAcceptedPre[index]
                                                  .receiver_id,
                                              is_accepted:
                                                getFriendAcceptedPre[index]
                                                  .is_accepted,
                                              created_at:
                                                getFriendAcceptedPre[index]
                                                  .created_at,
                                            });

                                            if (index == highest - 1) {
                                              friendDetails.accepted_request =
                                                accepted_arr;
                                              res.json({
                                                friend_list: friendDetails,
                                              });
                                            }
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      } else {
                        db.query(
                          `select * from friend_request where sender_id=${user_id} AND is_accepted = 0`,
                          (err, getFriendPending) => {
                            if (err) {
                              console.log("error: ", err);
                              res.json(err);
                              return;
                            }

                            if (
                              getFriendPending &&
                              getFriendPending.length > 0
                            ) {
                              var friendDetails = {};
                              var accepted_arr = [];
                              var receiver_arr = [];

                              var getPending_highest = getFriendPending.length;

                              for (
                                let index = 0;
                                index < getFriendPending.length;
                                index++
                              ) {
                                db.query(
                                  `select * from users where user_id=${getFriendPending[index].receiver_id}`,
                                  (err, getReceiverDetails) => {
                                    if (err) {
                                      console.log("error: ", err);
                                      res.json(err);
                                      return;
                                    }
                                    if (getReceiverDetails.length > 0) {
                                      receiver_arr.push({
                                        S_No: index + 1,
                                        sender_name:
                                          getUserDetails[0].user_name,
                                        sender_email: getUserDetails[0].email,
                                        receiver_name:
                                          getReceiverDetails[0].user_name,
                                        receiver_email:
                                          getReceiverDetails[0].email,
                                        id: getFriendPending[index].id,
                                        sender_id:
                                          getFriendPending[index].sender_id,
                                        receiver_id:
                                          getFriendPending[index].receiver_id,
                                        is_accepted:
                                          getFriendPending[index].is_accepted,
                                        created_at:
                                          getFriendPending[index].created_at,
                                      });

                                      if (index === getPending_highest - 1) {
                                        friendDetails.pending_request =
                                          receiver_arr;
                                        res.json({
                                          friend_list: friendDetails,
                                        });
                                      }
                                    }
                                  }
                                );
                              }
                            } else {
                              res.json("User id does not exist");
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  var friendDetails = {};
                  var accepted_arr = [];
                  db.query(
                    `select * from friend_request where sender_id=${user_id} AND is_accepted = 1`,
                    (err, getFriendAcceptedPre) => {
                      if (err) {
                        console.log("error: ", err);
                        res.json(err);
                        return;
                      }
                      if (
                        getFriendAcceptedPre &&
                        getFriendAcceptedPre.length > 0
                      ) {
                        var highest = getFriendAcceptedPre.length;

                        for (
                          let index = 0;
                          index < getFriendAcceptedPre.length;
                          index++
                        ) {
                          db.query(
                            `select * from block_lists where sender_id=${getFriendAcceptedPre[index].sender_id} AND receiver_id=${getFriendAcceptedPre[index].receiver_id} AND is_blocked = 1`,
                            (err, getFriendBlockLists) => {
                              if (err) {
                                console.log("error: ", err);
                                res.json(err);
                                return;
                              }
                              if (
                                getFriendBlockLists &&
                                getFriendBlockLists.length > 0
                              ) {
                                console.log("IfOne:", getFriendBlockLists);
                              } else {
                                db.query(
                                  `select * from friend_request where sender_id=${getFriendAcceptedPre[index].sender_id} AND receiver_id=${getFriendAcceptedPre[index].receiver_id} AND is_accepted = 1`,
                                  (err, getFriendAccepted) => {
                                    if (err) {
                                      console.log("error: ", err);
                                      res.json(err);
                                      return;
                                    }
                                    if (
                                      getFriendAccepted &&
                                      getFriendAccepted.length > 0
                                    ) {
                                      db.query(
                                        `select * from users where user_id=${getFriendAcceptedPre[index].receiver_id}`,
                                        (err, getAcceptedDetails) => {
                                          if (err) {
                                            console.log("error: ", err);
                                            res.json(err);
                                            return;
                                          }
                                          if (getAcceptedDetails.length > 0) {
                                            accepted_arr.push({
                                              S_No: index + 1,
                                              sender_name:
                                                getUserDetails[0].user_name,
                                              sender_email:
                                                getUserDetails[0].email,
                                              receiver_name:
                                                getAcceptedDetails[0].user_name,
                                              receiver_email:
                                                getAcceptedDetails[0].email,
                                              id: getFriendAcceptedPre[index]
                                                .id,
                                              sender_id:
                                                getFriendAcceptedPre[index]
                                                  .sender_id,
                                              receiver_id:
                                                getFriendAcceptedPre[index]
                                                  .receiver_id,
                                              is_accepted:
                                                getFriendAcceptedPre[index]
                                                  .is_accepted,
                                              created_at:
                                                getFriendAcceptedPre[index]
                                                  .created_at,
                                            });

                                            if (index == highest - 1) {
                                              friendDetails.accepted_request =
                                                accepted_arr;
                                              res.json({
                                                friend_list: friendDetails,
                                              });
                                            }
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      } else {
                        res.json("User id does not exist");
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.json("User id does not exist!");
          }
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
