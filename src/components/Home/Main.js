import React from 'react';
import "./home.css";
import img2 from "../../assets/img/home3.webp";
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className='main-container' style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}>
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
                    {/* <li><Link to="/contact" title="Contact">Contact</Link></li> */}
                </ul>
            </nav>
        </div>
    )
}

export default Main