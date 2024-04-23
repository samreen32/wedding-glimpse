import React, { useRef, useState } from 'react'
import MenuBar from './MenuBar';
import img2 from "../../../assets/img/home2.webp";
import adPhoto from "../../../assets/img/cloud.png";


function UploadImages() {
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

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    }
  };

  return (
    <div
      className='upload-image-container'
      style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
              </>
            ) : (
              <>
                <img src={adPhoto} alt='' style={{ width: "90px" }} />
                <div className='mt-3' onClick={handleBrowseClick}
                  style={{ cursor: 'pointer' }}>
                  <p style={{ fontWeight: "600", color: "white" }}>
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
                      color: "white", fontSize: "14px",
                      // marginTop: "-20px"
                    }}>
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

        <div className='row mt-3'>
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
                      <span style={{ fontSize: '20px', color: "white" }}>×</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <MenuBar />
    </div>
  )
}

export default UploadImages