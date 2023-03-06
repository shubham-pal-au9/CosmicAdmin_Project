import React from "react";

function EditCategory() {
  return (
    
    <>
        <main class="col-lg-10" id="main">
            <section class="spacethis">
                <div class="add_new_cat">
                    <h3 class="title">EDIT</h3>
                    <form action="add_new_inventory.html" method="POST">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>CATEGORY NAME</label>
                                    <input type="text" class="form-control" value="WEAPON" placeholder="" required />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>SUB CATEGORY NAME</label>
                                    <div class="edit_subcat">
                                        <input type="text" class="form-control" placeholder="NEW SUBCATEGORY" />
                                        <input type="text" class="form-control" value="ASSAULT" />
                                        <input type="text" class="form-control" value="SHOTGUN" />
                                        <input type="text" class="form-control" value="SMG" />
                                        <input type="text" class="form-control" value="PISTOL" />
                                        <input type="text" class="form-control" value="MELEE" />
                                        <input type="text" class="form-control" value="GRENADE" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-primary">UPDATE</button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <h4 class="add_item_hd">ALL CATEGORIES</h4>
                <div class="menu_list">
                    <ul>
                        <li class="dropdown">
                            <a href="#0">Weapons<i class="fa fa-angle-down" aria-hidden="true"></i></a>
                            <div class="dropdown-content">
                                <Link to="/itemassaultdetail" class="active">Assault</Link>
                                <Link to="/itemshotgundetail">Shotgun</Link>
                                <Link to="/itemsmgdetail">Smg</Link>
                                <Link to="/itempistoldetail">Pistol</Link>
                                <Link to="/itemmeleedetail.html">Melee</Link>
                                <Link to="/itemgrenadedetail">Grenades</Link>
                            </div>
                        </li>
                        <li>
                            <Link to="/itemcharacterdetail">Character</Link>
                        </li>
                        <li>
                            <Link to="/itempropertydetail"> Property</Link>
                        </li>
                        <li>
                            <Link to="/itemnftdetail">Nft Art</Link>
                        </li>
                    </ul>
                </div> */}
            </section>
        </main>
    </>
  );
}

export default EditCategory;
