import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { BASE_URL } from "../../../Constants";
import "./main.css";

function InventoryList() {
  const [weapon, setWeapon] = useState();
  const [character, setCharacter] = useState();

  const [hasTimeElapsedWeapon, setHasTimeElapsedWeapons] = useState();
  const [hasTimeElapsedCharacter, setHasTimeElapsedCharacter] = useState();

  const [deleteFilter, setDeleteFilter] = useState("All");

  const [allDeleteRestoreCharacter, setAllDeleteRestoreCharacter] =
    useState("");
  const [allDeleteRestoreWeapon, setAllDeleteRestoreWeapon] = useState("");

  const setDeleteAll = (deleteFilter) => {
    setDeleteFilter(deleteFilter);
  };

  useEffect(() => {
    ApiService.getTotalWeapons()
      .then(function (response) {
        const lastTwo = response.data.slice(-2);
        console.log("CheckrecentWepons:", lastTwo);
        setWeapon(lastTwo);

        var setWeaponFilter = response.data?.filter(function (el) {
          return el.status == 0;
        });
        console.log("newArray77:", setWeaponFilter);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, []);

  useEffect(() => {
    ApiService.getTotalCharacter()
      .then(function (response) {
        const lastTwo = response.data.slice(-2);
        console.log("CheckrecentCharacter11:", lastTwo);
        setCharacter(lastTwo);
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
              const lastTwo = response.data.slice(-2);
              setWeapon(lastTwo);
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
    setAllDeleteRestoreWeapon("restoreweapons");
    ApiService.deleteEnableDisableWeapons(wepondIdObj)
      .then(function (response) {
        if (response) {
          ApiService.getTotalWeapons()
            .then(function (response) {
              const lastTwo = response.data.slice(-2);
              setWeapon(lastTwo);
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

  const deleteCharacter = (characterId) => {
    const characterIbObj = {};
    characterIbObj.id = characterId;
    characterIbObj.status = 0;
    setAllDeleteRestoreCharacter("deleteCharacter");
    ApiService.deleteEnableDisableCharacter(characterIbObj)
      .then(function (response) {
        if (response) {
          ApiService.getTotalCharacter()
            .then(function (response) {
              const lastTwo = response.data.slice(-2);
              setCharacter(lastTwo);
              setTimeout(() => {
                setHasTimeElapsedCharacter(true);
              }, 4000);
              setHasTimeElapsedCharacter(false);
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

  const restoreCharacter = (characterId) => {
    const characterIbObj = {};
    characterIbObj.id = characterId;
    characterIbObj.status = 1;
    setAllDeleteRestoreCharacter("restoreCharacter");
    ApiService.deleteEnableDisableCharacter(characterIbObj)
      .then(function (response) {
        if (response) {
          ApiService.getTotalCharacter()
            .then(function (response) {
              const lastTwo = response.data.slice(-2);
              setCharacter(lastTwo);
              setTimeout(() => {
                setHasTimeElapsedCharacter(true);
              }, 4000);
              setHasTimeElapsedCharacter(false);
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
          <h3 className="title">Store</h3>
          <div className="menu_list">
            <ul>
              <li className="dropdown">
                <a href="#/inventorylist">
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
              <li>
                <Link to="/character">Character</Link>
              </li>
              {/* <li className="dropdown">
                <a href="#/inventorylist">
                  Filter Character
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
              </li> */}
              {/* <li>
                <Link to="/property"> Property</Link>
              </li>
              <li>
                <Link to="/nftart">Nft Art</Link>
              </li> */}
            </ul>
          </div>
          <div className="items_outer">
            {deleteFilter == "Active"
              ? hasTimeElapsedWeapon == false && (
                  <span className="statusColorCorrectWeapon">
                    Weapons has been deleted
                  </span>
                )
              : deleteFilter == "Deleted"
              ? hasTimeElapsedWeapon == false && (
                  <span className="statusColorCorrectWeapon">
                    Weapons has been restored
                  </span>
                )
              : allDeleteRestoreWeapon == "deleteWeapons"
              ? hasTimeElapsedWeapon == false && (
                  <span className="statusColorCorrectWeapon">
                    Weapons has been deleted
                  </span>
                )
              : hasTimeElapsedWeapon == false && (
                  <span className="statusColorCorrectWeapon">
                    Weapons has been restored
                  </span>
                )}

            {deleteFilter == "Active"
              ? hasTimeElapsedCharacter == false && (
                  <span className="statusColorCorrectWeapon">
                    Character has been deleted
                  </span>
                )
              : deleteFilter == "Deleted"
              ? hasTimeElapsedCharacter == false && (
                  <span className="statusColorCorrectWeapon">
                    Character has been restored
                  </span>
                )
              : allDeleteRestoreCharacter == "deleteCharacter"
              ? hasTimeElapsedCharacter == false && (
                  <span className="statusColorCorrectWeapon">
                    Character has been deleted
                  </span>
                )
              : hasTimeElapsedCharacter == false && (
                  <span className="statusColorCorrectWeapon">
                    Character has been restored
                  </span>
                )}

            <h4>Recently Added </h4>
            <div className="items_inner">
              {/* {deleteFilter == "Active"
                ? weapon?.map(
                    (weapons, index) =>
                      weapons.status === 1 && (
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
                            </div>
                          </div>
                        </div>
                      )
                  )
                : deleteFilter == "Deleted"
                ? weapon?.map(
                    (weapons, index) =>
                      weapons.status === 0 && (
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
                      )
                  )
                : weapon?.map((weapons, index) => (
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
                          {weapons.status == 1 ? (
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
                  ))} */}

              {weapon?.map((weapons, index) => (
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
                        <button className="btn btn-primary">Know More</button>
                      </Link>

                      {/* <div className="editDelBtn">
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
                            weapon_descriptions: weapons.weapon_descriptions,
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
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}

              {deleteFilter == "Active"
                ? character?.map(
                    (character, index) =>
                      character.status === 1 && (
                        <div className="item_box">
                          <div className="item_box_inr">
                            <figure>
                              <img
                                src={`${BASE_URL}/uploads/${character.character_image}`}
                                alt="SniperRifle"
                              />
                            </figure>
                            <h5>{character.character_name}</h5>
                            <div>
                              <Link to="/itemdetail">
                                <button className="btn btn-primary">
                                  Know More
                                </button>
                              </Link>

                              <div className="editDelBtn">
                                <Link
                                  to={"/editCharacter"}
                                  state={{
                                    character_image: character.character_image,
                                    character_id: character.id,
                                    character_name: character.character_name,
                                    character_type: character.character_type,
                                    character_price: character.amount,
                                    character_shield:
                                      character.character_shield,
                                    character_description:
                                      character.character_description,
                                    character_item_type: character.item_type,
                                    character_is_paid: character.is_paid,
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
                                  onClick={() => deleteCharacter(character.id)}
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
                      )
                  )
                : deleteFilter == "Deleted"
                ? character?.map(
                    (character, index) =>
                      character.status === 0 && (
                        <div className="item_box">
                          <div className="item_box_inr">
                            <figure>
                              <img
                                src={`${BASE_URL}/uploads/${character.character_image}`}
                                alt="SniperRifle"
                              />
                            </figure>
                            <h5>{character.character_name}</h5>
                            <div>
                              <Link to="/itemdetail">
                                <button className="btn btn-primary">
                                  Know More
                                </button>
                              </Link>

                              <div className="editDelBtn">
                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() => restoreCharacter(character.id)}
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
                      )
                  )
                : character?.map((character, index) => (
                    <div className="item_box">
                      <div className="item_box_inr">
                        <figure>
                          <img
                            src={`${BASE_URL}/uploads/${character.character_image}`}
                            alt="SniperRifle"
                          />
                        </figure>
                        <h5>{character.character_name}</h5>
                        <div>
                          <Link to="/itemdetail">
                            <button className="btn btn-primary">
                              Know More
                            </button>
                          </Link>
                          {/* {character.status === 1 ? (
                            <div className="editDelBtn">
                              <Link
                                to={"/editCharacter"}
                                state={{
                                  character_image: character.character_image,
                                  character_id: character.id,
                                  character_name: character.character_name,
                                  character_type: character.character_type,
                                  character_price: character.amount,
                                  character_shield: character.character_shield,
                                  character_description:
                                    character.character_description,
                                  character_item_type: character.item_type,
                                  character_is_paid: character.is_paid,
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
                                onClick={() => deleteCharacter(character.id)}
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
                                onClick={() => restoreCharacter(character.id)}
                              >
                                <i
                                  className="fa fa-undo-alt fa-sm"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default InventoryList;
