import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiService from "../../../../services/ApiService";
import { useLocation } from "react-router-dom";
import "./loadouts.css";

function AddNewInventory() {
  const [weapons, setWeapons] = useState(
    localStorage.getItem("weaponsType") === null
      ? "Machinegun"
      : localStorage.getItem("weaponsType")
  );
  const [imgUpload, setImgUpload] = useState();

  const [file, setFile] = useState();
  const [id, setId] = useState(0);
  const [weapon_name, setWeapon_name] = useState("");
  const [stateweapon_descriptions, setStateWeapon_descriptions] = useState("");
  const [stateWeapon_accuracy, setWeapon_accuracy] = useState(0);
  const [stateWeapon_damage, setWeapon_damage] = useState(0);
  const [stateWeapon_range, setWeapon_range] = useState(0);
  const [stateWeapon_fire_rate, setWeapon_fire_rate] = useState(0);
  const [stateSetWeapon_price, setWeapon_price] = useState(0);
  const [status, setStatus] = useState();
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);

  const weapon_Name = (event) => {
    setWeapon_name(event.target.value);
  };

  /* const weapon_ID = (event) => {
    setId(event.target.value);
  }; */

  const weapon_accuracy = (event) => {
    setWeapon_accuracy(event.target.value);
  };

  const weapon_damage = (event) => {
    setWeapon_damage(event.target.value);
  };

  const weapon_range = (event) => {
    setWeapon_range(event.target.value);
  };

  const weapon_fire_rate = (event) => {
    setWeapon_fire_rate(event.target.value);
  };

  const weapon_price = (event) => {
    setWeapon_price(event.target.value);
  };

  const weapon_descriptions = (event) => {
    setStateWeapon_descriptions(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("photo", file);
    //formData.append("id", id);
    formData.append("weapon_name", weapon_name);
    formData.append("weapon_descriptions", stateweapon_descriptions);
    formData.append("type", weapons);
    formData.append("item_type", "weapons");
    formData.append("weapon_accuracy", stateWeapon_accuracy);
    formData.append("weapon_damage", stateWeapon_damage);
    formData.append("weapon_range", stateWeapon_range);
    formData.append("weapon_fire_rate", stateWeapon_fire_rate);
    formData.append("weapon_mobility", 2);
    formData.append("weapon_control", 2);
    formData.append("is_paid", 1);
    formData.append("amount", stateSetWeapon_price);

    /* ApiService.editweaponloadout(formData) */
    ApiService.weaponloadout(formData)
      .then(function (response) {
        //handle success
        console.log(response);
        if (response.status == 200 || response.status == 204) {
          setStatus(response.status);
          setHasTimeElapsed(false);
          setTimeout(() => {
            setHasTimeElapsed(true);
          }, 4000);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const submitMelleGrenades = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("photo", file);
    //formData.append("id", id);
    formData.append("weapon_name", weapon_name);
    formData.append("weapon_descriptions", stateweapon_descriptions);
    formData.append("type", weapons);
    formData.append("item_type", "weapons");

    formData.append("weapon_accuracy", 0);
    formData.append("weapon_damage", stateWeapon_damage);
    formData.append("weapon_range", 0);
    formData.append("weapon_fire_rate", 0);
    formData.append("weapon_mobility", 2);
    formData.append("weapon_control", 2);
    formData.append("is_paid", 1);
    formData.append("amount", stateSetWeapon_price);

    /* ApiService.editweaponloadout(formData) */
    ApiService.weaponloadout(formData)
      .then(function (response) {
        //handle success
        console.log(response);
        setStatus(response.status);
        setHasTimeElapsed(false);
        setTimeout(() => {
          setHasTimeElapsed(true);
        }, 4000);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const handleWeaponsClick = (weapons) => {
    setWeapons(weapons);
    setWeapon_name("");
    setWeapon_accuracy(0);
    setWeapon_damage(0);
    setWeapon_range(0);
    setWeapon_fire_rate(0);
    setWeapon_price(0);
    setStateWeapon_descriptions("");
    setImgUpload();
    setFile();
    localStorage.setItem("weaponsType", weapons);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log("CheclImg:", event.target.files[0]);
      let img = event.target.files[0];
      console.log("CheckData7755:", URL.createObjectURL(img));
      setImgUpload(URL.createObjectURL(img));
      setFile(img);
    }
  };

  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethis">
          <h3 className="title">Add New</h3>
          <div className="menu_list">
            <div className="mnu_lst_fltr"></div>
            <ul>
              <li className="dropdown">
                <a href="#/addnewinventory#0" className="active">
                  Weapons<i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className="dropdown-content">
                  <Link
                    to="#0"
                    className="active"
                    onClick={() => handleWeaponsClick("Machinegun")}
                  >
                    Machinegun
                  </Link>
                  <Link to="#0" onClick={() => handleWeaponsClick("Shotgun")}>
                    Shotgun
                  </Link>
                  <Link to="#0" onClick={() => handleWeaponsClick("Smg")}>
                    Smg
                  </Link>
                  <Link to="#0" onClick={() => handleWeaponsClick("Pistol")}>
                    Pistol
                  </Link>

                  {/* These two */}
                  <Link to="#0" onClick={() => handleWeaponsClick("Melee")}>
                    Melee
                  </Link>
                  <Link to="#0" onClick={() => handleWeaponsClick("Grenades")}>
                    Grenades
                  </Link>
                </div>
                <div className="optns">
                  <Link className="cat_optns" to="/editcategory">
                    <img src="./img/edit.svg" alt="edit" />
                  </Link>
                  <a className="cat_optns" href="/">
                    <img src="./img/delete.svg" alt="delete" />
                  </a>
                </div>
              </li>
              <li>
                <Link to="/addnewcharacter">Character</Link>
                <div className="optns">
                  <Link className="cat_optns" to="/editcategory">
                    <img src="./img/edit.svg" alt="edit" />
                  </Link>
                  <a className="cat_optns" href="/">
                    <img src="./img/delete.svg" alt="delete" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <h4 className="add_item_hd">{weapons}</h4>
          {weapons === "Melee" || weapons === "Grenades" ? (
            <div className="nft_input mt-5">
              <p>
                {(status == 200 || status == 204) && hasTimeElapsed == false ? (
                  <span className="statusColorCorrectWeapon">
                    Weapons has been added
                  </span>
                ) : (
                  ""
                )}
              </p>
              <div className="nft_input_inr">
                <form
                  action="item_melee_detail.html"
                  onSubmit={submitMelleGrenades}
                  method="POST"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input_img">{<img src={imgUpload} />}</div>
                      <input
                        className="chs_fl mb-2"
                        type="file"
                        name="photo"
                        id="image"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => onImageChange(e)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="inv-font-style">NAME</label>
                        <input
                          type="text"
                          className="form-control"
                          value={weapon_name}
                          onChange={(e) => {
                            weapon_Name(e);
                          }}
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>DAMAGE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="20%"
                          value={stateWeapon_damage}
                          onChange={(e) => {
                            weapon_damage(e);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>PRICE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="$2"
                          value={stateSetWeapon_price}
                          onChange={(e) => {
                            weapon_price(e);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>discription</label>
                        <textarea
                          className="form-control"
                          placeholder="Write here..."
                          rows="4"
                          value={stateweapon_descriptions}
                          onChange={(e) => {
                            weapon_descriptions(e);
                          }}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mt-4">
                        <a href="view_individual_nft.html">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="nft_input mt-5">
              <p>
                {(status == 200 || status == 204) && hasTimeElapsed == false ? (
                  <span className="statusColorCorrectWeapon">
                    Weapons has been added
                  </span>
                ) : (
                  ""
                )}
              </p>

              <div className="nft_input_inr">
                <form
                  action=""
                  method="POST"
                  enctype="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input_img">{<img src={imgUpload} />}</div>
                      <input
                        className="chs_fl mb-2"
                        type="file"
                        name="photo"
                        id="image"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => onImageChange(e)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>NAME</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={weapon_name}
                          onChange={(e) => {
                            weapon_Name(e);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>TYPE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Automatic Gun"
                          value={weapons != "" ? weapons : "Assault"}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>ACCURACY</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="20%"
                          value={stateWeapon_accuracy}
                          onChange={(e) => weapon_accuracy(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>DAMAGE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="20%"
                          value={stateWeapon_damage}
                          onChange={(e) => weapon_damage(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>RANGE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="20%"
                          value={stateWeapon_range}
                          onChange={(e) => {
                            weapon_range(e);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>FIRE RATE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="20%"
                          value={stateWeapon_fire_rate}
                          onChange={(e) => weapon_fire_rate(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>PRICE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="$45"
                          value={stateSetWeapon_price}
                          onChange={(e) => weapon_price(e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>DISCRIPTION</label>
                        <textarea
                          className="form-control"
                          placeholder="Write here..."
                          rows="4"
                          value={stateweapon_descriptions}
                          onChange={(e) => {
                            weapon_descriptions(e);
                          }}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mt-4">
                        <a href="view_individual_nft.html">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default AddNewInventory;
