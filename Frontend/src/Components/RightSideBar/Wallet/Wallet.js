import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import moment from "moment";
import "./wallet.css";

function Wallet() {
  const [state, setState] = useState();
  const [checkStatus, setCheckStatus] = useState();

  let location = useLocation();

  useEffect(() => {
    const playerObj = {};
    playerObj.user_id = location.state.recentPlayerId;
    ApiService.getPlayerWalletDetails(playerObj)
      .then(function (response) {
        //handle success
        console.log("ResponseWallet:", response.data);
        if (response.data == "Please check your user id!") {
          setState([]);
        } else {
          setState(response.data);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, [location.state.recentPlayerId]);

  const changeCreditDebit = (changeStatus) => {
    setCheckStatus(changeStatus);
  };

  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethis">
          <div className="wallet">
            <h3 className="title">wallet</h3>
            <figure>
              <img src="./img/wallet.svg" alt="wallet-image" />
            </figure>
            <h6>Total balance</h6>
            {state && state[0] ? (
              <h1>BLD {state[0].totalDiamond}</h1>
            ) : (
              <h1>BLD</h1>
            )}
          </div>
          <div className="trans_fltrs">
            <a
              id="showall"
              className={
                checkStatus === "All" || checkStatus === undefined
                  ? "active"
                  : "single"
              }
              href="javascript:void(0);"
              onClick={() => changeCreditDebit("All")}
            >
              All
            </a>
            <a
              className={checkStatus === "Credited" ? "active" : "single"}
              href="javascript:void(0);"
              onClick={() => changeCreditDebit("Credited")}
            >
              Credited
            </a>
            <a
              className={checkStatus === "Debited" ? "active" : "single"}
              href="javascript:void(0);"
              onClick={() => changeCreditDebit("Debited")}
            >
              Debited
            </a>
            <a
              className={checkStatus === "Withdraw" ? "active" : "single"}
              href="javascript:void(0);"
              onClick={() => changeCreditDebit("Withdraw")}
            >
              Withdraw
            </a>
          </div>
          <div className="trs-hstr">
            <div className="wpn_box">
              <h1>Blood diamonds History</h1>
              <div className="trs-hstr-inr">
                <ul>
                  {state?.map((wallet, index) =>
                    checkStatus === "Debited" ? (
                      wallet.type == "debit" && (
                        <li id="div2" className="target">
                          <div className="trs-hstr-cont">
                            <span>
                              {index + 1}. {wallet.type} on
                            </span>
                            <div>{wallet.descriptions}</div>
                            <span className="wal-dt">
                              {moment(wallet.date).format(
                                "MMMM D, YYYY , h:mm a"
                              )}
                            </span>
                          </div>
                          <div
                            className={
                              wallet.type == "debit"
                                ? "trs-hstr-witdr-bal"
                                : "trs-hstr-credt-bal"
                            }
                          >
                            <span>
                              {wallet.type == "debit"
                                ? -wallet.diamond
                                : wallet.diamond}{" "}
                              BLD
                            </span>
                          </div>
                        </li>
                      )
                    ) : checkStatus === "Credited" ? (
                      wallet.type == "credit" && (
                        <li id="div2" className="target">
                          <div className="trs-hstr-cont">
                            <span>
                              {index + 1}. {wallet.type} on
                            </span>
                            <div>{wallet.descriptions}</div>
                            <span className="wal-dt">
                              {moment(wallet.date).format(
                                "MMMM D, YYYY , h:mm a"
                              )}
                            </span>
                          </div>
                          <div
                            className={
                              wallet.type == "debit"
                                ? "trs-hstr-witdr-bal"
                                : "trs-hstr-credt-bal"
                            }
                          >
                            <span>
                              {wallet.type == "debit"
                                ? -wallet.diamond
                                : wallet.diamond}{" "}
                              BLD
                            </span>
                          </div>
                        </li>
                      )
                    ) : checkStatus === "Withdraw" ? (
                      wallet.type == "withdraw" && (
                        <li id="div2" className="target">
                          <div className="trs-hstr-cont">
                            <span>
                              {index + 1}. {wallet.type} on
                            </span>
                            <div>{wallet.descriptions}</div>
                            <span className="wal-dt">
                              {moment(wallet.date).format(
                                "MMMM D, YYYY , h:mm a"
                              )}
                            </span>
                          </div>
                          <div className="Withdraw trs-hstr-witdr-bal">
                            <span>
                              {wallet.type == "withdraw"
                                ? -wallet.diamond
                                : wallet.diamond}{" "}
                              BLD
                            </span>
                          </div>
                        </li>
                      )
                    ) : (
                      <li id="div2" className="target">
                        <div className="trs-hstr-cont">
                          <span>
                            {index + 1}. {wallet.type} on
                          </span>
                          <div>{wallet.descriptions}</div>
                          <span className="wal-dt">
                            {moment(wallet.date).format(
                              "MMMM D, YYYY , h:mm a"
                            )}
                          </span>
                        </div>
                        <div
                          className={
                            wallet.type == "debit" || wallet.type == "withdraw"
                              ? "trs-hstr-witdr-bal"
                              : "trs-hstr-credt-bal"
                          }
                        >
                          <span>
                            {wallet.type == "debit" || wallet.type == "withdraw"
                              ? -wallet.diamond
                              : wallet.diamond}{" "}
                            BLD
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Wallet;
