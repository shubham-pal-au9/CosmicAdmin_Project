import React from "react";
import { Link } from "react-router-dom";

function AssaultItemDetail() {
  return (
    
    <>
        <main className="col-lg-10" id="main">
            <div  id="item_detail">
            <section className="spacethis">
                <div className="row">
                    <div className="col-md-7">
                        <div className="weapn">
                                {/* 3D modal Gun AK 9  */}
                            <model-viewer alt="modal" src="./img//AK 9/AK 9.gltf" ar ar-modes="webxr scene-viewer quick-look" 
                                camera-controls enable-pan>
                            </model-viewer>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="gun_head">
                            <h1>AK 9</h1>
                            <h4>AKX28589</h4>
                            <h5>Automatic Gun</h5>
                            <p>50 Caliber Auto Gun.Heavy barrel automatic with 
                                recoil air cooled gun with adjustable gears.Can 
                                be used in worst weather and easy to handel its grip
                                    is very well to grab the gun easily.50 Caliber Auto 
                                    Gun.Heavy barrel automatic with recoil air cooled gun
                                    with adjustable gears.Can be used in worst weather and
                                    easy to handel its grip is very well to grab the gun 
                                    easily.
                            </p>
                        </div>
                        <div className="gun_spec">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Accuracy
                                </span>
                                <div className="bar_outer">
                                    <span className="bar_inner"></span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Damage</span>
                                <div className="bar_outer">
                                    <span className="bar_inner"></span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Range</span>
                                    <div className="bar_outer">
                                        <span className="bar_inner"></span>
                                    </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Fire rate</span>
                                    <div className="bar_outer">
                                        <span className="bar_inner"></span>
                                    </div>
                            </div>
                        </div>
                        <span className="item_price">$6</span>
                        <div className="inv-btn mt-2">
                            <Link to="/weaponloadout">
                                <button className="btn btn-primary">BUY</button>
                            </Link>
                        </div>
                    </div>
                </div>  
            </section>
            </div>
        </main>
    </>
  );
}

export default AssaultItemDetail;
