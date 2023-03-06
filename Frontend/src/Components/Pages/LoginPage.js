import React from "react";
import "./loginpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";

function Navbar(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    props.setLeftSideBarHide(true);
    localStorage.clear();
  }, [props.setLeftSideBarHide]);

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const forgetPasswordFun = () => {
    navigate("/forgetpassword");
    console.log("Forget PAssword!");
  };

  const handleSubmit = (event) => {
    const sendCredentials = {};
    sendCredentials.email = email;
    sendCredentials.password = password;
    event.preventDefault();

    ApiService.login(sendCredentials)
      .then(function (response) {
        //handle success
        console.log("token:", response.data.token);
        setStatus(response.status);
        if (response.status === 200) {
          //navigate("/dashboard");
          navigate("/dashboard", { state: { token: response.data.token } });
          localStorage.setItem("tempToken", response.data.token);
          localStorage.setItem("searchHide", true);
          localStorage.setItem("isAuthenticate", "true");
          localStorage.setItem("logoutSession", true);
          localStorage.setItem("AdminId", response.data.user.id);
          console.log("response:", response.data.user.id);
        }
      })
      .catch(function (response) {
        //handle error
        setStatus(response.response.status);
      });
  };

  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethisOne">
          <div className="login_page">
            <div className="container">
              <div className="card_outer d-flex justify-content-center h-100">
                <div className="card">
                  {/* <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span className="face_clr"><i className="fa fa-facebook-square"></i></span>
                                <span className="goog_clr"><i className="fa fa-google-plus-square"></i></span>
                                <span className="twi_clr"><i className="fa fa-twitter-square"></i></span>
                            </div>
                        </div> */}
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="email"
                          onChange={(e) => changeEmail(e)}
                          required
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="password"
                          onChange={(e) => changePassword(e)}
                          required
                        />
                      </div>
                      {/* <div className="row align-items-center remember">
                                <input type="checkbox" required />Remember Me
                            </div> */}
                      <div className="form-group">
                        <a>
                          <input
                            type="submit"
                            value="Login"
                            className="btn float-right login_btn"
                          />
                        </a>
                      </div>
                      <div
                        className="forgetres-password"
                        onClick={forgetPasswordFun}
                      >
                        Forget or reset password!
                      </div>
                      {status === 400 || status === 401 || status === 404 ? (
                        <span className="statusColorIncorrect">
                          Incorrect Credentials
                        </span>
                      ) : status === 500 ? (
                        <span className="statusColorIncorrect">
                          Internal Server Error
                        </span>
                      ) : status === 200 ? (
                        <span className="statusColorCorrect">
                          Login Successful
                        </span>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                  {/* <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<a href="#">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Navbar;
