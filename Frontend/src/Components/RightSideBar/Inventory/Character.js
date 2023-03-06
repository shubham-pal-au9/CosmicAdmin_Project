import React from "react";
import WeaponsCategory from "./WeaponsCategory";
import CharacterCategory from "./CharacterCategory";
import PropertyCategory from "./PropertyCategory";
import NftCategory from "./NftCategory";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import { BASE_URL } from "../../../Constants";

function Character() {
  const [state, setState] = useState();
  const [hasTimeElapsedCharacter, setHasTimeElapsedCharacter] = useState();

  const [deleteFilter, setDeleteFilter] = useState("All");
  const [allDeleteRestoreCharacter, setAllDeleteRestoreCharacter] =
    useState("");

  const setDeleteAll = (deleteFilter) => {
    setDeleteFilter(deleteFilter);
  };

  useEffect(() => {
    ApiService.getTotalCharacter()
      .then(function (response) {
        console.log("CHeckresponse:", response);
        setState(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, []);

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
              setState(response.data);
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
              setState(response.data);
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
          <h3 className="title">Inventory</h3>
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
              <CharacterCategory />
              <li className="dropdown">
                <a href="#/character">
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
              </li>
              {/* <PropertyCategory />
              <NftCategory /> */}
            </ul>
          </div>
          <div className="items_outer">
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

            <h4>CHARACTER {deleteFilter}</h4>
            {deleteFilter == "Active" ? (
              <div className="items_inner">
                {state?.map(
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
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            ) : deleteFilter == "Deleted" ? (
              <div className="items_inner">
                {state?.map(
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
                )}
              </div>
            ) : (
              <div className="items_inner">
                {state?.map((character, index) => (
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
                          <button className="btn btn-primary">Know More</button>
                        </Link>
                        {character.status === 1 ? (
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
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Character;
