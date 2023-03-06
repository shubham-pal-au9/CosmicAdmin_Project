import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./leftSidebar.css";

function LeftSideMenu(props) {
  const [check, setCheck] = useState();
  localStorage.setItem("session", props.checkAuth);
  useEffect(() => {}, []);

  const setSearchHide = () => {
    console.log("CheckHide");
    localStorage.setItem("searchHide", true);
  };
  return (
    <>
      <aside className="col-lg-2" id="sidebar">
        <ul className="sidebar-menu">
          <li className="active">
            <Link
              to={"/dashboard"}
              className="active leftSidebarStyle"
              onClick={setSearchHide}
            >
              <i className="fa fa-dashboard"></i> Dashboard
            </Link>
          </li>
          <li className="dropdown">
            <div className="leftBarDesign">
              <i className="fa fa-user" aria-hidden="true"></i>
              <span className="paddingDesign">Players</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </div>
            <div className="dropdown-content">
              <Link
                to={"/playerdetails"}
                className="leftSidebarStyle"
                state={{
                  status: "playerlist",
                }}
              >
                <i className="fa fa-eye" aria-hidden="true"></i>Players List
              </Link>
            </div>
          </li>
          <li className="dropdown">
            <div className="leftBarDesign leftSidebarStyle">
              <i className="fa fa-archive" aria-hidden="true"></i>
              <span className="paddingDesign">Store</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </div>
            <div className="dropdown-content">
              <Link to={"/addnewinventory"} className="leftSidebarStyle">
                <i className="fa fa-plus-square" aria-hidden="true"></i>Add New
              </Link>

              <Link to={"/inventorylist"} className="leftSidebarStyle">
                <i className="fa fa-eye" aria-hidden="true"></i>Store List
              </Link>
            </div>
          </li>
          <li>
            <Link
              to={"/playerdetails"}
              className="leftSidebarStyle"
              state={{
                status: "bloodDiamondHistory",
              }}
            >
              <i className="fa fa-history"></i>Blood Diamond History
            </Link>
          </li>

          <li className="dropdown">
            <div className="leftBarDesign leftSidebarStyle">
              <i className="fas fa-store" aria-hidden="true"></i>
              <span className="paddingDesign">BLD Token Store</span>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </div>
            <div className="dropdown-content">
              <Link
                to={"/addUpdateBldTokenStore"}
                className="leftSidebarStyle"
                state={{
                  isBldTokenStore: "addBldToken",
                }}
              >
                <i className="fa fa-plus-square" aria-hidden="true"></i>Add New
                Bld Token
              </Link>

              <Link to={"/bldtokenstore"} className="leftSidebarStyle">
                <i className="fa fa-eye" aria-hidden="true"></i>Bld Token Store
                List
              </Link>
            </div>
          </li>

          <li>
            <Link to="/tournamenthistory" className="leftSidebarStyle">
              <i className="fa fa-history"></i>
              Tournament
              <div>History</div>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default LeftSideMenu;
