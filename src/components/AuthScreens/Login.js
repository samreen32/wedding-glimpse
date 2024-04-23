import React from 'react'
import "./register.css"
import img1 from "../../assets/img/register-img1.png";
import img2 from "../../assets/img/login-back2.webp";
import img3 from "../../assets/img/register-img2.png";

import Lottie from "lottie-react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    
    return (
        <>
            {/* <Navbar /> */}
            <div className="wrapper py-5" style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}>
                <div className="inner">
                    {/* <img src={img1} alt="" class="image-1" /> */}
                    <div className="app-loader-animation">
                        <Lottie
                            animationData={require("../../assets/animation/Animation - 1710132860264.json")}
                            loop
                            autoplay
                            className="image-1"
                            style={{ width: "100%", left: "-300px" }}
                        />
                    </div>
                    <form action="" className='register-form mt-5'>
                        <h3>Guest Login?</h3>
                        <div className="form-holder">
                            <span className="icon-holder"><MdEmail size={12} /></span>
                            <input type="text" className="form-control" placeholder="Mail" />
                        </div>
                        <div className="form-holder">
                            <span className="icon-holder"><FaLock size={12} /></span>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <button className='register-submit' onClick={()=> {
                            navigate("/home")
                        }}>
                            <span>Login</span>
                        </button>

                    </form>
                    {/* <img src={img3} alt="" class="image-2" /> */}
                    {/* <div className="app-loader-animation">
                        <Lottie
                            animationData={require("../../assets/animation/Animation - 1710132694975.json")}
                            loop
                            autoplay
                            className="image-2"
                        />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Login