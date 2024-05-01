import React from 'react';
import "./home.css";
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className='main-container'>
            <div className="top-right">
                <Link to="/login" className="button type--C">
                    <div className="button__line"></div>
                    <div className="button__line"></div>
                    <span className="button__text">Login</span>
                    <div className="button__drow1"></div>
                    <div className="button__drow2"></div>
                </Link>
            </div>
            <div className='main-section'>
                <div className="header">
                    <h1 className='mt-3'>THE WEDDING OF HARV AND MICHELLE</h1>
                    <p className='mt-3'>
                        We’re so honoured that you’re here to celebrate with us.<br />
                        If you choose to take any pictures or videos, <br />
                        we’d love you to share them by uploading them here.
                    </p>
                </div>
                <div className="button-container py-5 mt-4">
                    <Link to="/upload_images" className="button type--A">
                        <div className="button__line"></div>
                        <div className="button__line"></div>
                        <span className="button__text">Upload Images</span>
                        <div className="button__drow1"></div>
                        <div className="button__drow2"></div>
                    </Link>
                    <Link to="/upload_videos" className="button type--B">
                        <div className="button__line"></div>
                        <div className="button__line"></div>
                        <span className="button__text">Upload Videos</span>
                        <div className="button__drow1"></div>
                        <div className="button__drow2"></div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Main
