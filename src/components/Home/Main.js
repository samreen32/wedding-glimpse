import React from 'react';
import "./home.css";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";

function Main() {
    return (
        <div className='main-container'
        >
            {/* <>
                <input type="radio" id="nav-close" name="nav-toggle" value="nav-close" />
                <input type="radio" id="nav-toggle" name="nav-toggle" value="nav-toggle" />
                <Link to="javascript:void(0);" class="nav-toggle">
                    <label for="nav-toggle"></label>
                    <figure></figure>
                    <figure></figure>
                    <figure></figure>
                </Link>
                <Link to="javascript:void(0);" class="nav-close">
                    <label for="nav-close"></label>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                    </svg>
                </Link>
                <div class="logo-draw">
                    <p>Wedding Gilms</p>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/" title="Home">Home</Link></li>
                        <li><Link to="/upload_images" title="Upload Images">Upload Images</Link></li>
                        <li><Link to="/upload-videos" title="Upload Videos">Upload Videos</Link></li>
                        <li><Link to="/view-media" title="View Media">View Media</Link></li>
                        <li><Link to="/upload-audio" title="Upload Audio">View All</Link></li>
                    </ul>
                </nav>

            </> */}
            <div className='main-section'>
                <div className="header">
                    <h1 className='mt-3'>Welcome to Wedding</h1>
                    <p className='mt-3'>
                        We’re so honoured that you’re here to celebrate with us.<br />
                        If you choose to take any pictures or videos, <br />
                        we’d love you to share them by uploading them here.
                    </p>
                </div>
                <div class="button-container py-5 mt-4">
                    <Link to="/upload_images" class="button type--A">
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">Upload Images</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </Link>
                    <Link to="/" class="button type--B">
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">Upload Videos</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </Link>
                    <Link to="/" class="button type--C">
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">View Media</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </Link>
                </div>
                <div className="inner mt-5">
                    <div className="app-loader-animation">
                        <Lottie
                            animationData={require("../../assets/animation/Animation - 1713971808298.json")}
                            loop
                            autoplay
                            className="image-1"
                            style={{ width: "100%", left: "300px", }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main