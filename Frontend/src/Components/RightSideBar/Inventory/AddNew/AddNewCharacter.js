import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../../../../services/ApiService";
import { useState } from "react";

function AddNewCharacter(props) {
  const [imgUpload, setImgUpload] = useState();
  const [fname, setFname] = useState();
  const [cType, setCType] = useState();
  const [cPrice, setCPrice] = useState();
  const [cDesc, setCDesc] = useState();
  const [cShield, setCShield] = useState();
  const [status, setStatus] = useState();
  const [hasTimeElapsed, setHasTimeElapsed] = useState(false);

  const [file, setFile] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
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
    //formData.append("id", 23);
    formData.append("photo", file);
    formData.append("character_Name", fname);
    formData.append("character_type", cType);
    formData.append("item_type", "Character");
    formData.append("is_paid", 1);
    formData.append("amount", cPrice);
    formData.append("character_description", cDesc);
    formData.append("character_shield", cShield);

    /* ApiService.editcharacterloadout(formData) */
    ApiService.characterloadout(formData)
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
          <h3 className="title">Add New</h3>
          <div className="menu_list">
            <div className="mnu_lst_fltr">
              {/* <form action="" method="POST">
                <input
                  type="search"
                  className="form-control"
                  placeholder="CATEGORY NAME"
                />
                <button type="submit" className="btn btn-primary">
                  SEARCH
                </button>
              </form> */}
              {/* <Link to="/addnewcategory" className="ad_nw_ct">
                <button className="btn btn-primary">ADD NEW</button>
              </Link> */}
            </div>
            <ul>
              <li className="dropdown">
                <a href="#/addnewinventory#0" className="active">
                  Weapons<i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className="dropdown-content">
                  <Link to="/addnewinventory" className="active">
                    Assault
                  </Link>
                  <Link to="/addnewinventory">Shotgun</Link>
                  <Link to="/addnewinventory">Smg</Link>
                  <Link to="/addnewinventory">Pistol</Link>
                  <Link to="/addnewinventory">Melee</Link>
                  <Link to="/addnewinventory">Grenades</Link>
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
              {/* <li>
                <Link to="/addnewproperty"> Property</Link>
                <div className="optns">
                  <Link className="cat_optns" to="/editcategory">
                    <img src="./img/edit.svg" alt="edit" />
                  </Link>
                  <a className="cat_optns" href="/">
                    <img src="./img/delete.svg" alt="delete" />
                  </a>
                </div>
              </li> */}
              {/* <li>
                <Link to="/addnewnftart">Nft Art</Link>
                <div className="optns">
                  <Link className="cat_optns" to="/editcategory">
                    <img src="./img/edit.svg" alt="edit" />
                  </Link>
                  <a className="cat_optns" href="/">
                    <img src="./img/delete.svg" alt="delete" />
                  </a>
                </div>
              </li> */}
            </ul>
          </div>
          <h4 className="add_item_hd">CHARACTER</h4>
          <div className="nft_input mt-5">
            <p>
              {(status == 200 || status == 204) && hasTimeElapsed == false ? (
                <span className="statusColorCorrectWeapon">
                  Character has been added
                </span>
              ) : (
                ""
              )}
            </p>
            <div className="nft_input_inr">
              <form action="" method="POST" onSubmit={handleSubmit}>
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
                        name="fname"
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
        </section>
      </main>
    </>
  );
}

export default AddNewCharacter;
