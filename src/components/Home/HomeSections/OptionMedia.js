import React from 'react';
import img2 from "../../../assets/img/bg-1.webp";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function OptionMedia() {
    let navigate = useNavigate();

    return (
        <>
            {/* <div className='main-section'> */}
            <div className='upload-image-container' style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}>
                <div className='h-100 py-5 pb-5 px-5 container'>
                    <div className="d-flex align-items-center mb-3 mt-5" style={{ justifyContent: "flex-start" }}>
                        <IoIosArrowBack
                            style={{ cursor: 'pointer', marginRight: 'auto' }}
                            color="black"
                            size={50}
                            onClick={() => navigate("/")}
                        />
                        <h1 className="title-upload"
                            style={{ textAlign: "center", color: "white", width: "100%" }}
                        >
                            Please Select
                        </h1>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="card" style={{
                                background: "#4B5320", color: "white",
                                height: "100%"
                            }}>
                                <div className="card-body py-5">
                                    <h5 className="card-title">Wedding Images</h5>
                                    <p className="card-text">Explore a curated collection of beautiful images captured during your special day.</p>
                                    <Link to="/view_images" className="btn media-btn mt-5">View Images</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card" style={{
                                background: "#4B5320", color: "white",
                                height: "100%"
                            }}>
                                <div className="card-body py-5">
                                    <h5 className="card-title">Wedding Videos</h5>
                                    <p className="card-text">Watch the memorable moments and heartfelt vows.</p>
                                    <Link to="/view_videos" className="btn media-btn mt-5">View Videos</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* </div> */}
        </>
    )
}

export default OptionMedia;




