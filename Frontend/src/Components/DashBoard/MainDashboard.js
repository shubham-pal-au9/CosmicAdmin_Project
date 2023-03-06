import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";

function MainDashboard(props) {
  const location = useLocation();
  const [count, setCount] = useState();

  const [isTotalIncome, setTotalIncome] = useState();
  const navigate = useNavigate();

  // Get Total User Count

  const removeLocalStorage = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    ApiService.getTotalUser()
      .then(function (response) {
        //handle success
        console.log("location55:", location.pathname, props);
        props.setPathLocation(location.pathname);

        //console.log("CheckResponse77:", response.data.length);

        setCount(response.data[0].TotalUserCount);
        //localStorage.setItem("tempToken", response.data[1].token);
        //localStorage.setItem("tempvalue", response.data[0].TotalUserCount);
        //console.log("CheckData:", pathLocation);

        /* setTimeout(() => {
          removeLocalStorage();
        }, 20000); */
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    props.isAuthenticate(localStorage.getItem("isAuthenticate"));
    props.setLeftSideBarHide(false);

    // Get Total Income Count

    const getBldPurchaseHistory = {};
    ApiService.getBldPurchaseHistory(getBldPurchaseHistory)
      .then(function (response) {
        console.log("CheckResponse7755:", response.data.length);
        let totalIncomeCount = 0;
        //console.log("response5577:", response.data[0].token);
        //localStorage.setItem("tempToken", response.data[0].token);
        /* setTimeout(() => {
          removeLocalStorage();
        }, 20000); */
        const totalIncome = [];
        const incomeContent = response.data;
        if (response && response.data) {
          for (
            let incomeCount = 0;
            incomeCount < incomeContent.length;
            incomeCount++
          ) {
            const currentIncome = incomeContent[incomeCount].amount;
            totalIncomeCount = totalIncomeCount + currentIncome;
            totalIncome.push(totalIncomeCount);
          }
        }
        setTotalIncome(totalIncome[totalIncome.length - 1]);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [props.setLeftSideBarHide, props]);

  return (
    <>
      <main className="col-lg-10 vhh-headr" id="main">
        <section className="spacethis">
          <h3 className="title">Overview</h3>
          <div className="row mobile-scrollable">
            <div className="col-lg-4 col-sm-6 col-xs-6">
              <div className="dash-card">
                <i className="fa fa-user"></i>
                <p>Total Users</p>
                {count != "" ? (
                  <h1 className="text-success">{count}</h1>
                ) : (
                  <h1 className="text-success">
                    {localStorage.getItem("tempvalue")}
                  </h1>
                )}
                <button type="button" className="btn btn-theme">
                  Know More
                </button>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-xs-6">
              <div className="dash-card">
                <i className="fa fa-money-check" aria-hidden="true"></i>
                <p>Total Income</p>
                <h1 className="text-success">{isTotalIncome}</h1>
                <Link to={"/bldpurchasehistory"} className="leftSidebarStyle">
                  <button type="button" className="btn btn-theme">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-4 col-sm-6 col-xs-6">
              <div className="dash-card">
                <i className="fa fa-gears" aria-hidden="true"></i>
                <p>Total Services</p>
                <h1 className="text-danger">300</h1>
                <button type="button" className="btn btn-theme">
                  Know More
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-xs-6">
              <div className="dash-card">
                <i className="fa fa-th" aria-hidden="true"></i>
                <p>Multiplayer Rooms</p>
                <h1 className="text-info">50</h1>
                <button type="button" className="btn btn-theme">
                  Know More
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-xs-6">
              <div className="dash-card">
                <i className="fa fa-gears" aria-hidden="true"></i>
                <p>Total Services</p>
                <h1 className="text-danger">200</h1>
                <button type="button" className="btn btn-theme">
                  Know More
                </button>
              </div>
            </div> */}
          </div>
        </section>
      </main>
    </>
  );
}

export default MainDashboard;
