import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { ProgressBar } from "react-bootstrap";
import "./individualPlayer.css";

function IndividualPlayerView() {
  const [state, setState] = useState();
  const [userId, setUserId] = useState();
  let location = useLocation();
  console.log("CheckLocation:", location.state);

  useEffect(() => {
    const playerObj = {};
    playerObj.user_id = location.state.recentPlayerId;
    setUserId(location.state.recentPlayerId);
    console.log("IDDDD:", playerObj);
    ApiService.getPlayerIndiWeapons(playerObj)
      .then(function (response) {
        //handle success
        console.log("CheckPlayer:", response.data);
        setState(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, [location.state.recentPlayerId]);

  return (
    <>
      <main className="col-lg-10" id="main">
        <div className="abt_plyr">
          <div className="plyr_id">
            <figure>
              <img
                src="https://i.pinimg.com/550x/53/d4/0c/53d40c602d4d7e7bec3c7512ba830b5e.jpg"
                alt="player image"
              />
            </figure>
            <div className="plyr_id_cont">
              <h5>{location.state.playerName}</h5>
              <span>{location.state.recentPlayerId}</span>
            </div>
          </div>
          <div className="plyr_achivmnt">
            <div className="d-flex align-items-center">
              <span className="plyr_win">Total Wins :</span>
              <span>13</span>
            </div>
            <div className="d-flex align-items-center">
              {/* <span className="plyr_win">wallet balance :</span>
              <span>
                <div className="extr_btns">
                  <Link
                    to={"/wallet"}
                    state={{
                      test: "testData",
                      recentPlayerId: location.state.recentPlayerId,
                    }}
                  >
                    <button className="btn btn-primary">
                      <img src="./img/view.svg" alt="view" />
                    </button>
                  </Link>
                </div>
              </span> */}
            </div>
          </div>
        </div>
        <div className="mt-2 mt-sm-5">
          <div
            id="demo"
            className="carousel slide"
            data-ride="carousel"
            data-pause="hover"
          >
            <div>
              <ul className="carousel-indicators">
                <li
                  data-target="#demo"
                  data-slide-to="0"
                  className="active"
                ></li>
                {state?.map(
                  (player, index) =>
                    index > 0 && (
                      <li data-target="#demo" data-slide-to={index}></li>
                    )
                )}
              </ul>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="weapn">
                        {/*  3D modal Gun AK 9  */}
                        <model-viewer
                          alt="modal"
                          src="./img/AK 9/AK 9.gltf"
                          ar
                          ar-modes="webxr scene-viewer quick-look"
                          camera-controls
                          enable-pan
                        ></model-viewer>
                      </div>
                    </div>
                    <div className="col-md-5">
                      {state != undefined && (
                        <div>
                          <div className="gun_head">
                            <h1>{state[0].weapon_name}</h1>
                            <h4>{state[0].id}</h4>
                            <h5>{state[0].type}</h5>
                            <p>{state[0].weapon_descriptions}</p>
                          </div>

                          <div className="gun_spec">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="spec_cont">Accuracy</span>
                              <div className="bar_outer">
                                <ProgressBar
                                  variant="warning"
                                  now={state[0].weapon_accuracy}
                                />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="spec_cont">Damage</span>
                              <div className="bar_outer">
                                <ProgressBar
                                  variant="warning"
                                  now={state[0].weapon_damage}
                                />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="spec_cont">Range</span>
                              <div className="bar_outer">
                                <ProgressBar
                                  variant="warning"
                                  now={state[0].weapon_range}
                                />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="spec_cont">Fire rate</span>
                              <div className="bar_outer">
                                <ProgressBar
                                  variant="warning"
                                  now={state[0].weapon_fire_rate}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="inv-btn mt-2">
                            <Link
                              to={"/weaponloadout"}
                              state={{
                                test: "testData",
                                recentPlayerId: userId,
                              }}
                            >
                              <button className="btn btn-primary">
                                Loadouts
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Skip first one slider for now */}
                {state?.map(
                  (player, index) =>
                    index > 0 && (
                      <div className="carousel-item ">
                        <div className="row">
                          <div className="col-md-7">
                            <div className="weapn">
                              {/* 3D modal Gun AK 4 if change name to AK 4 it will not show  */}
                              <model-viewer
                                alt="modal"
                                src="./img/AK 4/AK 9 black.gltf"
                                ar
                                ar-modes="webxr scene-viewer quick-look"
                                camera-controls
                                enable-pan
                              ></model-viewer>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="gun_head">
                              <h1>{player.weapon_name}</h1>
                              <h4>{player.id}</h4>
                              <h5>{player.type}</h5>
                              <p>{player.weapon_descriptions}</p>
                            </div>
                            <div className="gun_spec">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Accuracy</span>
                                <div className="bar_outer">
                                  <ProgressBar
                                    variant="warning"
                                    now={player.weapon_accuracy}
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Damage</span>
                                <div className="bar_outer">
                                  <ProgressBar
                                    variant="warning"
                                    now={player.weapon_damage}
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Range</span>
                                <div className="bar_outer">
                                  <ProgressBar
                                    variant="warning"
                                    now={player.weapon_range}
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Fire rate</span>
                                <div className="bar_outer">
                                  <ProgressBar
                                    variant="warning"
                                    now={player.weapon_fire_rate}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="inv-btn mt-2">
                              <Link
                                to={"/weaponloadout"}
                                state={{
                                  test: "testData2",
                                  recentPlayerId: userId,
                                }}
                              >
                                <button className="btn btn-primary">
                                  Loadouts
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default IndividualPlayerView;
