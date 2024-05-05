import React, { useState } from 'react';
import "./register.css";
import img2 from "../../assets/img/bg-1.webp";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import { IoIosArrowBack } from 'react-icons/io';
import Swal from 'sweetalert2';

function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const credentials = {
            "Nader": "NR12358008",
            "Mich&Harv": "H&M12358008"
        };

        const isAuthorized = Object.entries(credentials).some(([userName, userPassword]) => {
            return username === userName && password === userPassword;
        });

        if (isAuthorized) {
            navigate("/view_media", {
                replace: true
            });
        } else {
            setError("Credentials not correct");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Credentials not correct!'
            });
        }
    };

    return (
        <>
            <div className="wrapper py-5" style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}>
                <div className="inner">
                    <button
                        style={{ background: "#E9E9E9", border: "none", padding: "10px 20px", borderRadius: "20px" }}
                        onClick={() => navigate("/")}
                    >
                        Back
                    </button>

                    <form className='register-form mt-5' onSubmit={handleLogin}>
                        <h3>Login</h3>
                        <div className="form-holder">
                            <span className="icon-holder"><MdEmail size={12} /></span>
                            <input type="text" className="form-control" placeholder="Username" value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-holder">
                            <span className="icon-holder"><FaLock size={12} /></span>
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type='submit' className='register-submit'>
                            <span>Login</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
