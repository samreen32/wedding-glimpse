import React, { useEffect, useState } from 'react';
import img2 from "../../../assets/img/bg-1.webp";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoIosArrowBack } from 'react-icons/io';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import Checkbox from '@mui/material/Checkbox';
import { saveAs } from 'file-saver';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ViewImages() {
  let navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [atLeastOneSelected, setAtLeastOneSelected] = useState(false);

  // Fetch images from firebase
  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'images/');
      setLoading(true);
      try {
        const res = await listAll(listRef);
        const imageUrls = await Promise.all(res.items.map((itemRef) => {
          return getDownloadURL(itemRef).then(url => ({
            url,
            ref: itemRef
          }));
        }));

        setImages(imageUrls.map(image => ({ ...image, selected: false })));
      } catch (error) {
        console.error("Failed to retrieve images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Delete images using firebase
  const handleDeleteImage = async (imageRef) => {
    try {
      await deleteObject(imageRef);
      Swal.fire('Deleted!', 'Your image has been deleted.', 'success');
      setImages(prevImages => prevImages.filter(image => image.ref !== imageRef));
    } catch (error) {
      console.error('Error removing image:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete the image!'
      });
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedImages = images.map(image => ({ ...image, selected: !selectAll }));
    setImages(updatedImages);
    setAtLeastOneSelected(!selectAll);
  };

  const handleImageSelect = (index) => {
    const updatedImages = [...images];
    updatedImages[index].selected = !updatedImages[index].selected;
    setImages(updatedImages);
    setAtLeastOneSelected(updatedImages.some(image => image.selected));
  };

  const handleDeleteSelectedImages = () => {
    const selectedImageRefs = images.filter(image => image.selected).map(image => image.ref);
    if (selectedImageRefs.length === 0) {
      Swal.fire('No images selected!', 'Please select at least one image to delete.', 'warning');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover the image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Promise.all(selectedImageRefs.map(imageRef => deleteObject(imageRef)));
          setImages(prevImages => prevImages.filter(image => !selectedImageRefs.includes(image.ref)));
          Swal.fire(
            'Deleted!',
            'Selected images have been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error removing images:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to delete the images!'
          });
        }
      }
    });
  };

  const handleDownloadSelectedImages = async () => {
    const selectedImages = images.filter(image => image.selected);

    if (selectedImages.length === 0) {
      Swal.fire('No images selected!', 'Please select at least one image to download.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Processing...',
      text: 'Uploading and downloading images, please wait.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const cloudinaryUrls = await Promise.all(selectedImages.map(async image => {
        const formData = new FormData();
        formData.append('file', image.url);
        formData.append('upload_preset', 'tvfer9dl');

        const response = await axios.post('https://api.cloudinary.com/v1_1/drgrcajhq/image/upload', formData);
        return response.data.secure_url;
      }));

      cloudinaryUrls.forEach(url => saveAs(url, url.split('/').pop()));

      Swal.fire(
        'Download Complete!',
        'Selected images have been downloaded.',
        'success'
      );
    } catch (error) {
      console.error('Failed to upload or download the images:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to upload or download the images!'
      });
    }
  };

  const handleDownload = async (image, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'tvfer9dl');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/drgrcajhq/image/upload', formData);
      saveAs(response.data.secure_url, 'weeding-image.jpg');
    } catch (error) {
      console.error('Failed to upload or download the image:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to upload or download the image!'
      });
    }
  };

  return (
    <>
      <div className='upload-image-container' style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}>
        <div className='h-100 py-5 pb-5' style={{ overflowX: "hidden" }}>
          <div className="d-flex align-items-center mb-3" style={{ justifyContent: "flex-start" }}>
            <h1 className="title-upload" style={{
              margin: 'auto', textAlign: "center", justifyContent: "center", color: "white",
              display: "flex"
            }}>
              <IoIosArrowBack style={{ cursor: 'pointer', marginRight: 'auto' }} size={50} onClick={() => navigate("/view_media")} />
              Wedding Images
            </h1>
          </div>
          <div className='control-bar'>
            <div className='control-group'>
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span className='select-all-text'>Select All</span>
            </div>
            <div className='control-group'>
              <button className="btn btn-danger" onClick={handleDeleteSelectedImages} disabled={!atLeastOneSelected}>
                Delete Images
              </button>
              <button
                className="btn btn-warning"
                style={{ background: "#4B5320", color: "white" }}
                onClick={handleDownloadSelectedImages} disabled={!atLeastOneSelected}
              >
                Download Images
              </button>
            </div>
          </div>

          <div className='mt-3 view-images-row'>
            {loading ? <p>Loading images...</p> : (
              images.map((image, index) => (
                <div className="" key={index}>
                  <div className="container" style={{ position: 'relative' }}>
                    <Checkbox
                      {...label}
                      checked={image.selected}
                      onChange={() => handleImageSelect(index)}
                      style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                    />
                    <img className="media-img"
                      src={image.url} alt={`Uploaded ${index}`}
                      style={{ width: "100%", cursor: 'pointer' }}
                    />
                    <div className="button-group">
                      <button className="btn btn-danger mt-2"
                        onClick={() => handleDeleteImage(image.ref)}>
                        Delete
                      </button>
                      <button className="btn btn-secondary mt-2 mx-2"
                        onClick={(e) =>
                          handleDownload(image.url, e)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewImages;
