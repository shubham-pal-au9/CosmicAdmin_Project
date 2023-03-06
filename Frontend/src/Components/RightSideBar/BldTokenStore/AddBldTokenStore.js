import React from "react";
import { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { useLocation } from "react-router-dom";
import "./addBldTokenStore.css";

function AddBldTokenStore() {
  const [hasTimeElapsed, setHasTimeElapsed] = useState();
  const [isBldTokenId, setBldTokenId] = useState();
  const [isNoOfToken, setNoOfToken] = useState();
  const [isPrice, setPrice] = useState();

  const number_of_token = (event) => {
    setNoOfToken(event.target.value);
  };

  const bldToken_price = (event) => {
    setPrice(event.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state.isBldTokenStore == "updateBldToken") {
      setBldTokenId(location.state.recentBldTokenId);
      setNoOfToken(location.state.recentBldToken_no_of_token);
      setPrice(location.state.recentBldToken_price);
    } else {
      setBldTokenId(0);
      setNoOfToken(0);
      setPrice(0);
    }
  }, [location.state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const bldTokenUpdateObj = {};
    bldTokenUpdateObj.no_of_token = isNoOfToken;
    bldTokenUpdateObj.price = isPrice;

    if (location.state.isBldTokenStore == "updateBldToken") {
      bldTokenUpdateObj.id = isBldTokenId;
      ApiService.updateBldTokenStore(bldTokenUpdateObj)
        .then(function (response) {
          setHasTimeElapsed(true);
          setTimeout(() => {
            setHasTimeElapsed(false);
          }, 4000);
        })
        .catch(function (response) {
          console.log(response);
        });
    } else {
      bldTokenUpdateObj.item_type = "bld_token";
      ApiService.addBldTokenStore(bldTokenUpdateObj)
        .then(function (response) {
          setHasTimeElapsed(true);
          setTimeout(() => {
            setHasTimeElapsed(false);
          }, 4000);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethis">
          {location.state.isBldTokenStore == "updateBldToken" ? (
            <h3 className="title">Update BLD Token</h3>
          ) : (
            <h3 className="title">Add BLD Token </h3>
          )}

          <div className="menu_list">
            <div className="mnu_lst_fltr"></div>
          </div>
          {hasTimeElapsed == true &&
            (location.state.isBldTokenStore == "updateBldToken" ? (
              <div className="statusColorCorrectBldToken">
                Bld Token has been Updated
              </div>
            ) : (
              <div className="statusColorCorrectBldToken">
                Bld Token has been Added
              </div>
            ))}
          <div className="nft_input mt-5">
            <div className="nft_input_inr">
              <form
                action="item_melee_detail.html"
                onSubmit={handleSubmit}
                method="POST"
              >
                <div className="row">
                  {location.state.isBldTokenStore == "updateBldToken" && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>ID</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={isBldTokenId}
                          value={isBldTokenId}
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="inv-font-style">Number of token</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          number_of_token(e);
                        }}
                        value={isNoOfToken}
                        placeholder="Enter number of token"
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
                        placeholder="Enter Price"
                        value={isPrice}
                        onChange={(e) => {
                          bldToken_price(e);
                        }}
                        required
                      />
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

export default AddBldTokenStore;
