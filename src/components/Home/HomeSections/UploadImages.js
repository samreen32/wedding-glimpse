import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import img2 from "../../../assets/img/home2.webp";
import adPhoto from "../../../assets/img/cloud.png";
import { IoIosArrowBack } from 'react-icons/io';

function UploadImages() {
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
    if (newFiles.length) {
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileName) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const uploadImageToFirebase = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log('Firebase Upload successful:', downloadUrl);
      Swal.fire({
        title: 'Success!',
        text: 'Your image has been uploaded successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Firebase Upload failed:', error);
      Swal.fire({
        title: 'Oops!',
        text: 'Failed to upload. Try again!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleUploadClick = () => {
    selectedFiles.forEach(file => {
      uploadImageToFirebase(file);
    });
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  return (
    <div className='upload-image-container' style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}>
      <div className='h-100 py-5 pb-5'>
        <div className="d-flex align-items-center mb-3" style={{ justifyContent: "flex-start" }}>

          <h1 className="title-upload" style={{
            margin: 'auto', textAlign: "center", justifyContent: "center",
            display: "flex"
          }}>
            <IoIosArrowBack style={{ cursor: 'pointer', marginRight: 'auto' }} size={50} onClick={() => navigate("/")} />
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
                    </span>
                  </span>
                  <button style={{ background: "#9ACD32", color: "white", cursor: "pointer", fontWeight: "600", padding: "16px" }}
                    onClick={handleUploadClick}>Upload Image</button>

                </>
              ) : (
                <div className='mt-3' onClick={handleBrowseClick}
                  style={{ cursor: 'pointer' }}>
                  <img src={adPhoto} alt='' />
                  <p style={{ fontWeight: "600" }}>
                    Drag and Drop
                    <span className="new-line">
                      or
                      <span style={{ color: "#fff" }} className='mx-1'>
                        Browse
                      </span>
                    </span>
                  </p>
                  <span className="new-line pb-4 mt-2"
                    style={{
                      color: "#fff", fontSize: "14px",
                      marginTop: "-20px"
                    }}>
                    .jpg, .png, .jpeg
                  </span>
                </div>
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


          <div className='row mt-3' style={{
            cursor: 'pointer',
            maxHeight: '150px',

            overflowY: 'auto'
          }}>
            <div style={{ display: "flex" }}>
              {selectedFiles.map((file, index) => (
                <div key={index} className="position-relative mb-2">
                  {file.url ? (
                    <div className='ad-selected-img mx-2'>
                      <img
                        src={file.url}
                        alt={file.name}
                        style={{ width: '200px', height: "200px", objectFit: "cover" }}
                      />
                      <button
                        onClick={() => handleRemoveFile(file.name)}
                        className='ad-img-cross-icon' >
                        <span style={{ fontSize: '23px' }}>×</span>
                      </button>
                    </div>
                  ) : (
                    <div className='ad-selected-img mx-2'>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{ width: '200px', height: "200px", objectFit: "cover" }}
                      />
                      <button
                        onClick={() => handleRemoveFile(file.name)}
                        className='ad-img-cross-icon' >
                        <span style={{ fontSize: '23px' }}>×</span>
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
  );
}

export default UploadImages;
