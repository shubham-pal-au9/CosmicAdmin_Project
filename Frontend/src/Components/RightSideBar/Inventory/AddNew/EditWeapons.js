import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiService from "../../../../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../../src/Constants";
import "./loadouts.css";

function EditWeapons() {
  const location = useLocation();

  const [weapons, setWeapons] = useState(location.state.weapon_type);
  const [imgUpload, setImgUpload] = useState();

  const [setImgChange, setOnImgChange] = useState(false);
  const [file, setFile] = useState();
  const [id, setId] = useState(location.state.weapons_id);
  const [weapon_name, setWeapon_name] = useState(location.state.weapon_name);
  const [stateweapon_descriptions, setStateWeapon_descriptions] = useState(
    location.state.weapon_descriptions
  );
  const [stateWeapon_accuracy, setWeapon_accuracy] = useState(
    location.state.weapon_accuracy
  );
  const [stateWeapon_damage, setWeapon_damage] = useState(
    location.state.weapon_damage
  );
  const [stateWeapon_range, setWeapon_range] = useState(
    location.state.weapon_range
  );
  const [stateWeapon_fire_rate, setWeapon_fire_rate] = useState(
    location.state.weapon_fire_rate
  );
  const [stateSetWeapon_price, setWeapon_price] = useState(
    location.state.weapon_price
  );
  const [status, setStatus] = useState();
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);

  const navigate = useNavigate();

  const weapon_Name = (event) => {
    setWeapon_name(event.target.value);
  };

  useEffect(() => {
    console.log("CheckState55:", location.state.weapon_type);
  }, [location.state]);

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

  const backEditWeapon = () => {
    if (location.state.weapon_type == "Machinegun") {
      navigate("/assaultweapons");
    } else if (location.state.weapon_type == "Shotgun") {
      navigate("/shotgunweapons");
    } else if (location.state.weapon_type == "Smg") {
      navigate("/smgweapons");
    } else if (location.state.weapon_type == "Pistol") {
      navigate("/pistolweapons");
    } else if (location.state.weapon_type == "Melee") {
      navigate("/meleeweapons");
    } else if (location.state.weapon_type == "Grenades") {
      navigate("/grenadesweapons");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("photo", file);
    formData.append("id", id);
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

    ApiService.editweaponloadout(formData)
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
    formData.append("id", id);
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

    ApiService.editweaponloadout(formData)
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
    localStorage.setItem("weaponsType", weapons);
  };

  const onImageChange = (event) => {
    console.log("CheckChange11");
    setOnImgChange(true);
    if (event.target.files && event.target.files[0]) {
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
          <h3 className="title">Update Weapon</h3>

          <h4 className="add_item_hd">{location.state.weapon_type}</h4>
          {weapons === "Melee" || weapons === "Grenades" ? (
            <div className="nft_input mt-5">
              <p>
                {(status == 200 || status == 204) && hasTimeElapsed == false ? (
                  <span className="statusColorCorrectWeapon">
                    Weapons has been updated
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
                      {setImgChange == true ? (
                        <div className="input_img">
                          {<img src={imgUpload} />}
                        </div>
                      ) : (
                        <div className="input_img">
                          <img
                            src={`${BASE_URL}/uploads/${location.state.weapon_image}`}
                            alt="SniperRifle"
                          />
                        </div>
                      )}
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
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label>ID22</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="FED366"
                          onChange={(e) => {
                            weapon_ID(e);
                          }}
                          required
                        />
                      </div>
                    </div> */}
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

                        <button
                          className="btn btn-info backalign"
                          onClick={backEditWeapon}
                        >
                          Back
                        </button>
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
                    Weapons has been updated
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
                      {setImgChange == true ? (
                        <div className="input_img">
                          {<img src={imgUpload} />}
                        </div>
                      ) : (
                        <figure>
                          <img
                            src={`${BASE_URL}/uploads/${location.state.weapon_image}`}
                            alt="SniperRifle"
                          />
                        </figure>
                      )}

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
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label>ID11</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="FED366"
                          onChange={(e) => {
                            weapon_ID(e);
                          }}
                          required
                        />
                      </div>
                    </div> */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>TYPE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Automatic Gun"
                          value={weapons}
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

                        <button
                          className="btn btn-info backalign"
                          onClick={backEditWeapon}
                        >
                          Back
                        </button>
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

export default EditWeapons;
