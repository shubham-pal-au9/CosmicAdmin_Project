import React from "react";
import { Link } from "react-router-dom";

function GrenadeItemDetail() {
  return (
    
    <>
        <main className="col-lg-10" id="main">
            <section className="spacethis">
                <div className="row">
                    <div className="col-md-7">
                        <div className="weapn">
                            {/* Grenade Modal */}
                            <model-viewer alt="modal" src="./img/m67_fragmentation_grenade/scene.gltf" ar ar-modes="webxr scene-viewer quick-look" 
                                camera-controls enable-pan>
                            </model-viewer>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="gun_head">
                            <h1>Grenade 2</h1>
                            <h5>Double Power</h5>
                            <p>melee knife, and they must hold the knife 
                                upright for a moment before they will make 
                                contact with the ground and you will see the
                                knife turn around and look down at the ground.
                                " This was common practice among samurai in 
                                Europe. In ancient times they would have found
                                    a small area around the ground and chop their
                                    heads into pieces to build up enough space to
                                    mount wooden spears on.
                            </p>
                        </div>
                        <div className="gun_spec">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Range</span>
                                <div className="bar_outer">
                                    <span className="bar_inner"></span>
                                </div>
                            </div>
                        </div>
                        <div className="gun_spec">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="spec_cont">Damage</span>
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
        </main>
    </>
  );
}

export default GrenadeItemDetail;
