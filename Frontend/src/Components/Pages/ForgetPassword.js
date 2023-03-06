import React from "react";
import "./forgetpass.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

function ForgetPassword(props) {
  const [email, setEmail] = useState();
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    props.setLeftSideBarHide(true);
    localStorage.clear();
  }, [props.setLeftSideBarHide]);

  const handleSubmit = (event) => {
    const sendCredentials = {};
    sendCredentials.email = email;
    event.preventDefault();

    ApiService.forgetPassword(sendCredentials)
      .then(function (response) {
        //handle success
        console.log("ForgetPass:", response.data);
        setResponse(response.data);
        if (
          response.status == 200 &&
          response.data ==
            "OTP has been sent to your register email id please check!"
        ) {
          setTimeout(() => {
            navigate("/verifyresetassword");
          }, 5000);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethisOne">
          <div className="login_page">
            <div className="container">
              <div className="card_outer d-flex justify-content-center h-100">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="forgetpassMain">
                        <div className="text-center forgetpassHead ">
                          Forgot Password?
                        </div>
                        <div class="text-center forgetpassHead">
                          You can reset your password here.
                        </div>
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
                          placeholder="email"
                          onChange={(e) => changeEmail(e)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <a>
                          <input
                            type="submit"
                            value="Send OTP"
                            className="btn float-right login_btn"
                          />
                        </a>
                      </div>
                      {response ==
                      "OTP has been sent to your register email id please check!" ? (
                        <div className="respSuccessStyle">{response}</div>
                      ) : (
                        <div className="respErrStyle">{response}</div>
                      )}
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

export default ForgetPassword;
