import React from "react";
import "./verifyreset.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";

function VerifyResetPassword(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [otp, setOtp] = useState();
  const [respone, setResponse] = useState();

  useEffect(() => {
    props.setLeftSideBarHide(true);
    localStorage.clear();
  }, [props.setLeftSideBarHide]);

  const handleSubmit = (event) => {
    const sendCredentials = {};
    sendCredentials.email = email;
    sendCredentials.password = password;
    sendCredentials.confirm_password = confirmpassword;
    sendCredentials.otp = otp;
    event.preventDefault();

    ApiService.resetPassword(sendCredentials)
      .then(function (response) {
        //handle success
        console.log("resetPass:", response.data);
        if (
          (response.status =
            200 && response.data == "Password has been reset successfully")
        ) {
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
        setResponse(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const confirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const otpSend = (event) => {
    setOtp(event.target.value);
  };

  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethisOne">
          <div className="login_page">
            <div className="container">
              <div className="card_outer d-flex justify-content-center h-100">
                <div className="card">
                  <div className="card-body entireverify">
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
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm password"
                          onChange={(e) => confirmPassword(e)}
                          required
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="OTP"
                          onChange={(e) => otpSend(e)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <a>
                          <input
                            type="submit"
                            value="Reset Password"
                            className="btn float-right login_btn"
                          />
                        </a>
                      </div>
                      <div className="respSuccessStyle">{respone}</div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default VerifyResetPassword;
