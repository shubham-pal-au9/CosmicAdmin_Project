import React from "react";
import { Link } from "react-router-dom";

function AddNewCategory() {
  return (
    
    <>
        <main className="col-lg-10" id="main">
            <section className="spacethis">
                <div className="add_new_cat">
                    <h3 className="title">Add New</h3>
                    <form action="" method="POST">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Category NAME</label>
                                    <input type="text" className="form-control" value="" placeholder="Category Name" required />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Sub Category NAME</label>
                                    <input type="text" className="form-control" value="" placeholder="Sub Category Name" required />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary">ADD</button>
                            </div>
                        </div>
                    </form>
                    <h4 className="add_item_hd">ALL CATEGORIES</h4>
                    <div className="menu_list">
                        <ul>
                            <li className="dropdown">
                                <a href="#0">Weapons<i className="fa fa-angle-down" aria-hidden="true"></i></a>
                                <div className="dropdown-content">
                                    <Link to="/assaultitemdetail" className="active">Assault</Link>
                                    <Link to="/shotgunitemdetail">Shotgun</Link>
                                    <Link to="/smgitemdetail">Smg</Link>
                                    <Link to="/pistolitemdetail">Pistol</Link>
                                    <Link to="/meleeitemdetail.html">Melee</Link>
                                    <Link to="/grenadeitemdetail">Grenades</Link>
                                </div>
                            </li>
                            <li>
                                <Link to="/characteritemdetail">Character</Link>
                            </li>
                            <li>
                                <Link to="/propertyitemdetail"> Property</Link>
                            </li>
                            <li>
                                <Link to="/nftartitemdetail">Nft Art</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    </>
  );
}

export default AddNewCategory;
