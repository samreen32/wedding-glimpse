import React, { useRef, useState } from 'react';
import img2 from "../../../assets/img/login-back1.webp";
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { FaPhotoVideo } from "react-icons/fa";
import Swal from 'sweetalert2';


function UploadVideos() {
    let navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dragOver, setDragOver] = useState(false);

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const newFiles = Array.from(e.dataTransfer.files);
        processFiles(newFiles);
    };

    const handleRemoveFile = (fileName) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const handleFilesChange = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
        e.target.value = '';
    };

    const processFiles = (files) => {
        const videoFiles = files.filter(file => file.type.startsWith('video/'));
        if (videoFiles.length) {
            setSelectedFiles(prevFiles => [...prevFiles, ...videoFiles]);
        }
    };

    const uploadVideo = async (videoFile) => {
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('upload_preset', 'tvfer9dl');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/drgrcajhq/video/upload`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Upload successful:', data);
                Swal.fire({
                    title: 'Success!',
                    text: 'Your video has been uploaded successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                const errorData = await response.json();
                console.error('Upload failed:', errorData);
                Swal.fire({
                    title: 'Oops!',
                    text: 'Failed to uplaod. Try again!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Error during video upload.');
        }
    };

    const handleUploadClick = () => {
        selectedFiles.forEach(videoFile => {
            uploadVideo(videoFile);
        });
    };


    return (

        <div className='upload-image-container'
            style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}
        >
            <div className='h-100 py-5 pb-5'>
                <div className="d-flex align-items-center mb-3" style={{ justifyContent: "flex-start" }}>
                    <IoIosArrowBack style={{ cursor: 'pointer', marginRight: 'auto' }} size={50}
                        onClick={() => navigate("/")} />
                    <h1 className="title-upload"
                        style={{ margin: '0px 40% 0px 0px', textAlign: "center" }}
                    >
                        Upload Videos
                    </h1>
                </div>
                <div className='image-upload-div container'>
                    <div className={`row mt-3 px-3 ${dragOver ? 'drag-over' : ''}`} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <div className='col-md-12 ad-photo-container'>
                            {selectedFiles.length > 0 ? (
                                <>
                                    <div className='mt-3' style={{ cursor: 'pointer', maxHeight: '100px', overflowY: 'auto' }}>
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="file-item">
                                                <span>{file.name}</span>
                                                <span className="remove-file" onClick={() => handleRemoveFile(file.name)}>X</span>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="new-line pb-3 mt-3" onClick={handleBrowseClick}>
                                        or
                                        <span style={{ color: "white", cursor: "pointer", fontWeight: "600" }} className='mx-1'>
                                            Drop more Files
                                        </span><br />
                                        <br />
                                        <button
                                            style={{
                                                background: "#9ACD32",
                                                color: "white",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                                padding: "16px"
                                            }}
                                            onClick={handleUploadClick}
                                            className='mx-1'>
                                            Upload Video
                                        </button>
                                    </span>
                                </>
                            ) : (
                                <>
                                    <FaPhotoVideo alt='' size={50} color='white' />
                                    {/* <img src={adPhoto} alt='' style={{ width: "90px" }} /> */}
                                    <div className='mt-3' onClick={handleBrowseClick} style={{ cursor: 'pointer' }}>
                                        <p style={{ fontWeight: "600", color: "white", fontSize: "22px" }}>
                                            Drag and Drop
                                            <span className="new-line">
                                                or
                                                <span style={{ color: "#66b855" }} className='mx-1'>
                                                    Browse
                                                </span>
                                            </span>
                                        </p>
                                        <span className="new-line pb-4" style={{ color: "white", fontSize: "14px" }}>mp4, avi, mov</span>
                                    </div>
                                </>
                            )}
                            <input type="file" ref={fileInputRef} accept="video/mp4, video/x-m4v, video/*" multiple style={{ display: 'none' }} onChange={handleFilesChange} />
                        </div>
                    </div>
                    <div className='row mt-3'
                        style={{ cursor: 'pointer', maxHeight: '250px', overflowY: 'auto' }}
                    >
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="col-md-4 mb-2 text-center">
                                <video controls style={{ width: '200px', height: '200px' }}>
                                    <source src={URL.createObjectURL(file)} type={file.type} />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="mt-2">
                                    <button className="btn btn-danger" onClick={() => handleRemoveFile(file.name)}>
                                        Remove Video
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
}

export default UploadVideos;
