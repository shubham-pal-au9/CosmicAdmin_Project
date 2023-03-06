import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../../../services/ApiService";
import { BASE_URL } from "../../../../../src/Constants";
import { useState } from "react";

function EditCharacter(props) {
  const location = useLocation();
  const [imgUpload, setImgUpload] = useState(location.state.weapon_type);
  const [fname, setFname] = useState(location.state.character_name);
  const [cType, setCType] = useState(location.state.character_type);
  const [cPrice, setCPrice] = useState(location.state.character_price);
  const [cDesc, setCDesc] = useState(location.state.character_description);
  const [cShield, setCShield] = useState(location.state.character_shield);
  const [status, setStatus] = useState();
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);
  const [id, setId] = useState(location.state.character_id);
  const [setImgChange, setOnImgChange] = useState(false);
  const [cItemtype, setCItemType] = useState(
    location.state.character_item_type
  );
  const [cIsPaid, setCIsPaid] = useState(location.state.character_is_paid);

  const [file, setFile] = useState();

  const navigate = useNavigate();

  const backEditWeapon = () => {
    navigate("/character");
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setOnImgChange(true);
      console.log("CheckData7755new11:", URL.createObjectURL(img));
      setImgUpload(URL.createObjectURL(img));
      setFile(img);
    }
  };

  const character_Name = (event) => {
    setFname(event.target.value);
  };
  const character_type = (event) => {
    setCType(event.target.value);
  };
  const character_price = (event) => {
    setCPrice(event.target.value);
  };
  const character_discription = (event) => {
    setCDesc(event.target.value);
  };

  const character_shield = (event) => {
    setCShield(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("id", id);
    formData.append("photo", file);
    formData.append("character_Name", fname);
    formData.append("character_type", cType);
    formData.append("item_type", cItemtype);
    formData.append("is_paid", cIsPaid);
    formData.append("amount", cPrice);
    formData.append("character_description", cDesc);
    formData.append("character_shield", cShield);

    ApiService.editcharacterloadout(formData)
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
  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethis">
          <h3 className="title">Update Character</h3>

          <h4 className="add_item_hd">CHARACTER</h4>
          <div className="nft_input mt-5">
            <p>
              {(status == 200 || status == 204) && hasTimeElapsed == false ? (
                <span className="statusColorCorrectWeapon">
                  Character has been updated
                </span>
              ) : (
                ""
              )}
            </p>
            <div className="nft_input_inr">
              <form action="" method="POST" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    {setImgChange == true ? (
                      <div className="input_img">{<img src={imgUpload} />}</div>
                    ) : (
                      <div className="input_img">
                        <img
                          src={`${BASE_URL}/uploads/${location.state.character_image}`}
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
                      <label>NAME</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="fname"
                        value={fname}
                        onChange={(e) => {
                          character_Name(e);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Type</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cType}
                        onChange={(e) => {
                          character_type(e);
                        }}
                        placeholder="CrossFit"
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
                        value={cPrice}
                        onChange={(e) => {
                          character_price(e);
                        }}
                        placeholder="$2"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Shield</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cShield}
                        onChange={(e) => {
                          character_shield(e);
                        }}
                        placeholder="$100"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>discription</label>
                      <textarea
                        className="form-control"
                        onChange={(e) => {
                          character_discription(e);
                        }}
                        placeholder="Write here..."
                        rows="4"
                        value={cDesc}
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
        </section>
      </main>
    </>
  );
}

export default EditCharacter;
