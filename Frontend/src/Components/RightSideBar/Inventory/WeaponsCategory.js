import React from "react";
import { Link } from "react-router-dom";

function WeaponsCategory() {
  return (
    <>
      <li className="dropdown">
        <a href="">
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
    </>
  );
}

export default WeaponsCategory;
