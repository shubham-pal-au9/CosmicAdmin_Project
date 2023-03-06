import React from "react";
import WeaponsCategory from "./WeaponsCategory";
import CharacterCategory from "./CharacterCategory";
import PropertyCategory from "./PropertyCategory";
import NftCategory from "./NftCategory";
import { Link } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { BASE_URL } from "../../../Constants";
import { useEffect, useState } from "react";

function PistolWeapons() {
  const [state, setState] = useState();
  const [hasTimeElapsedWeapon, setHasTimeElapsedWeapons] = useState();

  const [deleteFilter, setDeleteFilter] = useState("All");
  const [allDeleteRestoreWeapon, setAllDeleteRestoreWeapon] = useState("");

  const setDeleteAll = (deleteFilter) => {
    setDeleteFilter(deleteFilter);
  };

  useEffect(() => {
    ApiService.getTotalWeapons()
      .then(function (response) {
        var setWeaponFilter = response.data?.filter(function (el) {
          return el.type == "Pistol";
        });
        setState(setWeaponFilter);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, []);

  const deleteWeapons = (weaponId) => {
    const wepondIdObj = {};
    wepondIdObj.id = weaponId;
    wepondIdObj.status = 0;
    setAllDeleteRestoreWeapon("deleteWeapons");
    ApiService.deleteEnableDisableWeapons(wepondIdObj)
      .then(function (response) {
        if (response) {
          ApiService.getTotalWeapons()
            .then(function (response) {
              var setWeaponFilter = response.data?.filter(function (el) {
                return el.type == "Pistol";
              });
              setState(setWeaponFilter);
              setTimeout(() => {
                setHasTimeElapsedWeapons(true);
              }, 4000);
              setHasTimeElapsedWeapons(false);
            })
            .catch(function (response) {
              console.log(response);
            });
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const restoreWeapons = (weaponId) => {
    const wepondIdObj = {};
    wepondIdObj.id = weaponId;
    wepondIdObj.status = 1;
    setAllDeleteRestoreWeapon("restoreWeapons");
    ApiService.deleteEnableDisableWeapons(wepondIdObj)
      .then(function (response) {
        if (response) {
          ApiService.getTotalWeapons()
            .then(function (response) {
              var setWeaponFilter = response.data?.filter(function (el) {
                return el.type == "Pistol";
              });
              setState(setWeaponFilter);
              setTimeout(() => {
                setHasTimeElapsedWeapons(true);
              }, 4000);
              setHasTimeElapsedWeapons(false);
            })
            .catch(function (response) {
              console.log(response);
            });
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethis">
          <h3 className="title">Inventory</h3>
          <div className="menu_list">
            <ul>
              <li className="dropdown">
                <a href="#/pistolweapons">
                  Weapons<i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className="dropdown-content">
                  <Link to="/assaultweapons">Machinegun</Link>
                  <Link to="/shotgunweapons">Shotgun</Link>
                  <Link to="/smgweapons">Smg</Link>
                  <Link to="/pistolweapons">Pistol</Link>
                  <Link to="/meleeweapons">Melee</Link>
                  <Link to="/grenadesweapons">Grenades</Link>
                </div>
              </li>
              <CharacterCategory />
              <li className="dropdown">
                <a href="#/pistolweapons">
                  Filter Weapons
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className="dropdown-content">
                  <Link to="#0" onClick={() => setDeleteAll("All")}>
                    All
                  </Link>
                  <Link to="#0" onClick={() => setDeleteAll("Active")}>
                    Active
                  </Link>
                  <Link to="#0" onClick={() => setDeleteAll("Deleted")}>
                    Deleted
                  </Link>
                </div>
              </li>
              {/*  <PropertyCategory />
              <NftCategory /> */}
            </ul>
          </div>
          <div className="items_outer">
            {deleteFilter == "Active"
              ? hasTimeElapsedWeapon == false && (
                  <span className="statusColorCorrectWeapon">
                    Pistol has been deleted
                  </span>
                )
              : deleteFilter == "Deleted"
              ? hasTimeElapsedWeapon == false && (
                  <span className="statusColorCorrectWeapon">
                    Pistol has been restored
                  </span>
                )
              : allDeleteRestoreWeapon == "deleteWeapons"
              ? hasTimeElapsedWeapon == false && (
                  <span className="statusColorCorrectWeapon">
                    Pistol has been deleted
                  </span>
                )
              : hasTimeElapsedWeapon == false && (
                  <span className="statusColorCorrectWeapon">
                    Pistol has been restored
                  </span>
                )}
            <h4>PISTOL {deleteFilter}</h4>
            <div className="items_inner">
              {deleteFilter == "Active"
                ? state?.map(
                    (weapons, index) =>
                      weapons.status === 1 && (
                        <>
                          <div className="item_box">
                            <div className="item_box_inr">
                              <figure>
                                <img
                                  src={`${BASE_URL}/uploads/${weapons.weapon_image}`}
                                  alt="SniperRifle"
                                />
                              </figure>
                              <h5>{weapons.weapon_name}</h5>
                              <div>
                                <Link to="/itemdetail">
                                  <button className="btn btn-primary">
                                    Know More
                                  </button>
                                </Link>

                                <div className="editDelBtn">
                                  <Link
                                    to={"/editWeapons"}
                                    state={{
                                      weapons_id: weapons.id,
                                      weapon_image: weapons.weapon_image,
                                      weapon_name: weapons.weapon_name,
                                      weapon_type: weapons.type,
                                      weapon_accuracy: weapons.weapon_accuracy,
                                      weapon_damage: weapons.weapon_damage,
                                      weapon_range: weapons.weapon_range,
                                      weapon_fire_rate:
                                        weapons.weapon_fire_rate,
                                      weapon_price: weapons.amount,
                                      weapon_descriptions:
                                        weapons.weapon_descriptions,
                                    }}
                                    className="btn btn-info btn-sm"
                                  >
                                    <i
                                      className="fa fa-edit fa-sm"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteWeapons(weapons.id)}
                                  >
                                    <i
                                      className="fa fa-trash fa-sm"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                  )
                : deleteFilter == "Deleted"
                ? state?.map(
                    (weapons, index) =>
                      weapons.status === 0 && (
                        <>
                          <div className="item_box">
                            <div className="item_box_inr">
                              <figure>
                                <img
                                  src={`${BASE_URL}/uploads/${weapons.weapon_image}`}
                                  alt="SniperRifle"
                                />
                              </figure>
                              <h5>{weapons.weapon_name}</h5>
                              <div>
                                <Link to="/itemdetail">
                                  <button className="btn btn-primary">
                                    Know More
                                  </button>
                                </Link>

                                <div className="editDelBtn">
                                  <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => restoreWeapons(weapons.id)}
                                  >
                                    <i
                                      className="fa fa-undo-alt fa-sm"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                  )
                : state?.map((weapons, index) => (
                    <>
                      <div className="item_box">
                        <div className="item_box_inr">
                          <figure>
                            <img
                              src={`${BASE_URL}/uploads/${weapons.weapon_image}`}
                              alt="SniperRifle"
                            />
                          </figure>
                          <h5>{weapons.weapon_name}</h5>
                          <div>
                            <Link to="/itemdetail">
                              <button className="btn btn-primary">
                                Know More
                              </button>
                            </Link>
                            {weapons.status === 1 ? (
                              <div className="editDelBtn">
                                <Link
                                  to={"/editWeapons"}
                                  state={{
                                    weapons_id: weapons.id,
                                    weapon_image: weapons.weapon_image,
                                    weapon_name: weapons.weapon_name,
                                    weapon_type: weapons.type,
                                    weapon_accuracy: weapons.weapon_accuracy,
                                    weapon_damage: weapons.weapon_damage,
                                    weapon_range: weapons.weapon_range,
                                    weapon_fire_rate: weapons.weapon_fire_rate,
                                    weapon_price: weapons.amount,
                                    weapon_descriptions:
                                      weapons.weapon_descriptions,
                                  }}
                                  className="btn btn-info btn-sm"
                                >
                                  <i
                                    className="fa fa-edit fa-sm"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => deleteWeapons(weapons.id)}
                                >
                                  <i
                                    className="fa fa-trash fa-sm"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                            ) : (
                              <div className="editDelBtn">
                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() => restoreWeapons(weapons.id)}
                                >
                                  <i
                                    className="fa fa-undo-alt fa-sm"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PistolWeapons;
