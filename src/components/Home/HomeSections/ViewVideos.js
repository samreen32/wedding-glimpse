import React, { useEffect, useState } from 'react';
import img2 from "../../../assets/img/bg-1.webp";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoIosArrowBack } from 'react-icons/io';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

function ViewVideos() {
    let navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            const storage = getStorage();
            const listRef = ref(storage, 'videos/');
            setLoading(true);

            try {
                const res = await listAll(listRef);
                const videoUrls = await Promise.all(res.items.map(itemRef => {
                    return getDownloadURL(itemRef).then(url => ({
                        url,
                        ref: itemRef  // Store reference for deletion
                    }));
                }));

                setVideos(videoUrls);
            } catch (error) {
                console.error("Failed to retrieve videos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch videos!'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const handleDelete = async (videoRef) => {
        try {
            await deleteObject(videoRef);
            Swal.fire('Deleted!', 'Your video has been deleted.', 'success');
            setVideos(prevVideos => prevVideos.filter(video => video.ref !== videoRef));
        } catch (error) {
            console.error('Error removing video:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to delete the video!'
            });
        }
    };

    return (
        <>
            <div className='upload-image-container' style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}>
                <div className='h-100 py-5 pb-5' style={{overflowX: "hidden"}}>
                    <div className="d-flex align-items-center mb-3" style={{ justifyContent: "flex-start" }}>
                        <h1 className="title-upload" style={{
                            margin: 'auto', textAlign: "center", justifyContent: "center",
                            display: "flex", color: "white",
                        }}>
                            <IoIosArrowBack style={{ cursor: 'pointer', marginRight: 'auto' }} size={50} onClick={() => navigate("/view_media")} />
                            Videos
                        </h1>
                    </div>
                    <div className='row mt-3'>
                        {loading ? <p>Loading videos...</p> : (
                            videos.map((video, index) => (
                                <div key={index} className="col-md-3 col-sm-12">
                                    <div className="video-container">
                                        <video controls className="media-img"
                                            src={video.url} alt={`Uploaded ${index}`}
                                            style={{ width: "300px", height: "300px" }} // Ensuring the video resizes responsively
                                        />
                                        <button className="btn btn-danger mt-2" // Added mt-2 for a little margin-top
                                            onClick={() => handleDelete(video.ref)}>
                                            Delete Video
                                        </button>
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

export default ViewVideos;
