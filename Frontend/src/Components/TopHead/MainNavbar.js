import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./mainnav.css";

function Navbar(props) {
  const [search, setSearch] = useState();
  props.setMainSearch(search);

  useEffect(() => {
    console.log("CheckData", localStorage.getItem("sustainState"));
  }, [localStorage.getItem("sustainState")]);

  const removeLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light custom-nav">
          <i className="fa fa-bars mobile-menu"></i>
          <Link
            to={props.leftSideBarHide === false ? "/dashboard" : "/"}
            className="navbar-brand"
          >
            <figure>
              <img src="/img/logo-white.png" alt="logo-cosmic" />
            </figure>
          </Link>
          {/* {window.location.pathname === "/playerslist" && (
            <form className="srch form-inline search-form">
              <i className="fa fa-search"></i>
              <input
                className="form-control "
                type="search"
                placeholder="Search..."
                onChange={(e) => handleTextSearch(e)}
              />
            </form>
          )} */}

          <ul className="navbar-nav ml-auto mt-lg-0 align-items-center flex-row">
            {/* <li className="drop">
              <Link to={"/"} className="nav-link bell-icon-badge">
                <i className="fa-regular fa-bell" aria-hidden="true"></i>
                <span className="bell-badge">10</span>
              </Link>

              <ul className="drop-menu">
                <li>
                  <a href="/">Art</a>
                </li>
                <li>
                  <a href="#0">Coding</a>
                </li>
                <li>
                  <a href="#0">Design</a>
                </li>
                <li>
                  <a href="#0">Web Development</a>
                </li>
              </ul>
            </li> */}

            {props.leftSideBarHide === false && (
              <li className="dropdown">
                <Link to="#0" className="nav-link user-prfile">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQCd65QS4A2fXU5UuxKa3dJ8IJ84LVZHefbA&usqp=CAU"
                    alt="user"
                  />
                </Link>
                <div className="dropdown-content-out dropdown-content alignL-logout">
                  <a href="/" onClick={removeLocalStorage}>
                    Logout
                  </a>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
