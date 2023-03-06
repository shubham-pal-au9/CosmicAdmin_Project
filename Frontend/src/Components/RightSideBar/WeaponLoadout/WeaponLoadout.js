import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import ApiService from "../../../services/ApiService";
import { BASE_URL } from "../../../Constants";

import "./weaponsloadout.css";

function WeaponLoadout() {
  const [state, setState] = useState();
  const [checkWeaponsType, setcheckWeaponsType] = useState("Machinegun");

  let location = useLocation();

  useEffect(() => {
    const playerObj = {};
    playerObj.user_id = location.state.recentPlayerId;
    ApiService.getPlayerIndiWeapons(playerObj)
      .then(function (response) {
        //handle success
        console.log("Check data77:", response.data);
        setState(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, [location.state.recentPlayerId]);

  const weaponType = (weaponsType) => {
    console.log("DataCheck:", weaponsType);
    setcheckWeaponsType(weaponsType);
  };

  return (
    <>
      <main className="col-lg-10 vhh-headr" id="main">
        <div className="mt-2 mt-md-5">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3 pr-lg-0">
                  <div className="atcmnt">
                    <ul>
                      <li>
                        <div
                          className={
                            checkWeaponsType === "Machinegun"
                              ? "d-flex justify-content-end align-items-center fix_align active"
                              : "d-flex justify-content-end align-items-center fix_align"
                          }
                          onClick={() => weaponType("Machinegun")}
                        >
                          <span className="txt-blu">Machinegun</span>
                        </div>
                      </li>
                      <li>
                        <div
                          className={
                            checkWeaponsType === "Shotgun"
                              ? "d-flex justify-content-end align-items-center fix_align active"
                              : "d-flex justify-content-end align-items-center fix_align"
                          }
                          onClick={() => weaponType("Shotgun")}
                        >
                          <span className="txt-blu">Shotgun</span>
                        </div>
                      </li>
                      <li>
                        <div
                          className={
                            checkWeaponsType === "Smg"
                              ? "d-flex justify-content-end align-items-center fix_align active"
                              : "d-flex justify-content-end align-items-center fix_align"
                          }
                          onClick={() => weaponType("Smg")}
                        >
                          <span className="txt-blu">Smg</span>
                        </div>
                      </li>
                      <li>
                        <div
                          className={
                            checkWeaponsType === "Pistol"
                              ? "d-flex justify-content-end align-items-center fix_align active"
                              : "d-flex justify-content-end align-items-center fix_align"
                          }
                          onClick={() => weaponType("Pistol")}
                        >
                          <span className="txt-blu">Pistol</span>
                        </div>
                      </li>
                      <li>
                        <div
                          className={
                            checkWeaponsType === "Melee"
                              ? "d-flex justify-content-end align-items-center fix_align active"
                              : "d-flex justify-content-end align-items-center fix_align"
                          }
                          onClick={() => weaponType("Melee")}
                        >
                          <span className="txt-blu">Melee</span>
                        </div>
                      </li>
                      <li>
                        <div
                          className={
                            checkWeaponsType === "Grenades"
                              ? "d-flex justify-content-end align-items-center fix_align active"
                              : "d-flex justify-content-end align-items-center fix_align"
                          }
                          onClick={() => weaponType("Grenades")}
                        >
                          <span className="txt-blu">Grenade</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-9 pl-lg-0">
                  <div className="wpn_box">
                    <h1>Loadout</h1>

                    {state?.map(
                      (weapons, index) =>
                        weapons.type == checkWeaponsType && (
                          <span>
                            <Link to="/purchaseweaponaccesry">
                              <div className="boxx">
                                <img
                                  src={`${BASE_URL}/uploads/${weapons.weapon_image}`}
                                  alt="image"
                                />
                              </div>
                            </Link>
                          </span>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-md-4">
                        <div className="wpn_box">
                                    <h1>type</h1>
                                    <div className="boxx">
                                        <img src="assets/images/2.png" alt="image" />
                                    </div>
                                    <div className="boxx">
                                        <img src="assets/images/3.png" alt="image" />
                                    </div>
                                </div>
                        </div>  */}
          </div>
        </div>
      </main>
    </>
  );
}

export default WeaponLoadout;
