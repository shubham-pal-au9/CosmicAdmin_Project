import React from "react";
import { Link } from "react-router-dom";

function AddNewShotgun() {
  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethis">
          <h3 className="title">Add New</h3>
          <div className="menu_list">
            <div className="mnu_lst_fltr">
              <form action="" method="POST">
                <input
                  type="search"
                  className="form-control"
                  placeholder="CATEGORY NAME"
                />
                <button type="submit" className="btn btn-primary">
                  SEARCH
                </button>
              </form>
              <Link to="/addnewcategory" className="ad_nw_ct">
                <button className="btn btn-primary">ADD NEW</button>
              </Link>
            </div>
            <ul>
              <li className="dropdown">
                <a href="#0" className="active">
                  Weapons<i className="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <div className="dropdown-content">
                  <Link to="/addnewinventory" className="active">
                    Assault
                  </Link>
                  <Link to="/addnewshotgun">Shotgun</Link>
                  <Link to="/addnewsmg">Smg</Link>
                  <Link to="/addnewpistol">Pistol</Link>
                  <Link to="/addnewmelee">Melee</Link>
                  <Link to="/addnewgrenade">Grenades</Link>
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
              <li>
                <Link to="/addnewproperty"> Property</Link>
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
                <Link to="/addnewnftart">Nft Art</Link>
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
          <h4 className="add_item_hd">SHOTGUN</h4>
          <div className="nft_input mt-5">
            <div className="nft_input_inr">
              <form action="item_detail.html" method="POST">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input_img"></div>
                    <input
                      className="chs_fl mb-2"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/png, image/gif, image/jpeg"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>NAME</label>
                      <input
                        type="text"
                        className="form-control"
                        value=""
                        placeholder="Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value=""
                        placeholder="FED366"
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
                        value=""
                        placeholder="Automatic Gun"
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
                        value=""
                        placeholder="20%"
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
                        value=""
                        placeholder="20%"
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
                        value=""
                        placeholder="20%"
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
                        value=""
                        placeholder="20%"
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
                        value=""
                        placeholder="$45"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>discription</label>
                      <textarea
                        className="form-control"
                        value=""
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

export default AddNewShotgun;
