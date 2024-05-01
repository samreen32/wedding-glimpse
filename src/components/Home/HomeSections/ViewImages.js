import React, { useEffect, useState } from 'react';
import img2 from "../../../assets/img/bg-1.webp";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoIosArrowBack } from 'react-icons/io';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

function ViewImages() {
  let navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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
            ref: itemRef  // Store the reference for deletion and download
          }));
        }));

        setImages(imageUrls);
      } catch (error) {
        console.error("Failed to retrieve images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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

  const handleDownloadImage = async (url, name) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      Swal.fire({
        icon: 'error',
        title: 'Download failed',
        text: `Could not download the image, please try again. Error: ${error.message}`
      });
    }
  };

  // const handleDownloadImage = (url, name) => {
  //   Swal.fire({
  //     icon: 'info',
  //     title: 'Click to Download',
  //     html: `<a href="${url}" target="_blank" download="${name}">Click here to download the image</a>`
  //   });
  // };


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
              Images
            </h1>
          </div>
          <div className='row mt-3'>
            {loading ? <p>Loading images...</p> : (
              images.map((image, index) => (
                <div className="col-md-3 col-sm-12" key={index}>
                  <div className="container" >
                    <img className="media-img"
                      src={image.url} alt={`Uploaded ${index}`}
                      style={{ width: "100%" }}
                    />
                    <div className="button-group">
                      <button className="btn btn-danger mt-2"
                        onClick={() => handleDeleteImage(image.ref)}>
                        Delete Image
                      </button>
                      {/* <button className="btn btn-secondary mt-2 mx-1"
                        onClick={() => handleDownloadImage(image.url, `Image_${index}.jpg`)}>
                        Download Image
                      </button> */}
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
