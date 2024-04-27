import React, { useRef, useState } from 'react';
import img2 from "../../../assets/img/home2.webp";
import adPhoto from "../../../assets/img/cloud.png";
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

function UploadImages() {
  let navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const cloudName = "drgrcajhq";

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
    if (newFiles.length) {
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileName) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tvfer9dl');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        Swal.fire({
          title: 'Success!',
          text: 'Your image has been uploaded successfully!',
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
      console.error('Error uploading file: ', error);
    }
  };

  const handleUploadClick = () => {
    selectedFiles.forEach(file => {
      uploadImage(file);
    });
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };


  return (
    <div
      className='upload-image-container'
      style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', }}
    >
      <div className='h-100 py-5 pb-5'>
        <div className="d-flex align-items-center mb-3" style={{ justifyContent: "flex-start" }}>
          <IoIosArrowBack style={{ cursor: 'pointer', marginRight: 'auto' }} size={50}
            onClick={() => navigate("/")} />
          <h1 className="title-upload"
            style={{ margin: '0px 40% 0px 0px', textAlign: "center" }}
          >
            Upload Images
          </h1>
        </div>
        <div className='image-upload-div container'>
          <div
            className={`row mt-3 px-3 ${dragOver ? 'drag-over' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className='col-md-12 ad-photo-container'>
              {selectedFiles?.length > 0 ? (
                <>
                  <div className='mt-3'
                    style={{
                      cursor: 'pointer',
                      maxHeight: '150px',
                      overflowY: 'auto'
                    }}
                  >
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="file-item">
                        <span>{file.name}</span>
                        <span className="remove-file"
                          onClick={() => handleRemoveFile(file.name)}>X</span>
                      </div>
                    ))}
                  </div>
                  <span className="new-line pb-3 mt-3" onClick={handleBrowseClick}>
                    or
                    <span
                      style={{
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                      className='mx-1'>
                      Drop more Files
                    </span><br /><br />
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
                      Upload Image
                    </button>
                  </span>
                </>
              ) : (
                <>
                  <img src={adPhoto} alt='' style={{ width: "90px" }} />
                  <div className='mt-3' onClick={handleBrowseClick}
                    style={{ cursor: 'pointer' }}>
                    <p style={{ fontWeight: "600", color: "white", fontSize: "22px" }}>
                      Drag and Drop
                      <span className="new-line">
                        or
                        <span style={{ color: "#66b855" }} className='mx-1'>
                          Browse
                        </span>
                      </span>
                    </p>
                    <span className="new-line pb-4"
                      style={{
                        color: "white", fontSize: "14px"
                      }}
                    >
                      png, jpg, jpeg
                    </span>
                  </div>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept=".png, .jpg, .jpeg"
                multiple
                style={{ display: 'none' }}
                onChange={handleFilesChange}
              />

            </div>
          </div>

          <div className='row mt-3'
            style={{ cursor: 'pointer', maxHeight: '250px', overflowY: 'auto' }}>
            <div style={{ display: "flex" }}>
              {selectedFiles.map((file, index) => (
                <div key={index} className="position-relative mb-2">
                  {file.type.startsWith('image/') && (
                    <div className='ad-selected-img mx-2'>
                      <img
                        src={URL.createObjectURL(file)} alt={file.name}
                        style={{ width: '200px', height: "200px", objectFit: "cover" }}
                      />
                      <button
                        onClick={() => handleRemoveFile(file.name)}
                        className='ad-img-cross-icon ml-3 mt-1'>
                        <span style={{ fontSize: '24px', color: "black", fontWeight: "800" }}>×</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadImages