import React from "react";
import WeaponsCategory from "./WeaponsCategory";
import CharacterCategory from "./CharacterCategory";
import PropertyCategory from "./PropertyCategory";
import NftCategory from "./NftCategory";
import { Link } from "react-router-dom";

function NftArt() {
  return (
    <>
      <main className="col-lg-10" id="main">
        <section className="spacethis">
          <h3 className="title">Inventory</h3>
          <div className="menu_list">
            <ul>
              <WeaponsCategory />
              <CharacterCategory />
              <PropertyCategory />
              <NftCategory />
            </ul>
          </div>
          <div className="items_outer">
            <h4>NFT ART</h4>
            <div className="items_inner">
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
              <div className="item_box">
                <div className="item_box_inr">
                  <figure>
                    <img src="./img/SniperRifle_SR.png" alt="SniperRifle" />
                  </figure>
                  <h5>Sniper Dux</h5>
                  <Link to="/itemdetail">
                    <button className="btn btn-primary">Know More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default NftArt;
