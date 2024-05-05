import React, { useEffect, useState, useCallback } from 'react';
import img2 from "../../../assets/img/bg-1.webp";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoIosArrowBack } from 'react-icons/io';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { Checkbox } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ViewVideos() {
    let navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [atLeastOneSelected, setAtLeastOneSelected] = useState(false);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

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


    
    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedVideos = videos.map(video => ({
            ...video,
            selected: newSelectAll
        }));
        setVideos(updatedVideos);
        setAtLeastOneSelected(newSelectAll);
        forceUpdate(); // This forces the component to re-render
    };

    const handleVideoSelect = (index) => {
        const updatedVideos = [...videos];
        updatedVideos[index].selected = !updatedVideos[index].selected;
        setVideos(updatedVideos);
        setAtLeastOneSelected(updatedVideos.some(video => video.selected));
    };

    const handleDeleteSelectedVideos = () => {
        const selectedVideoRefs = videos.filter(video => video.selected).map(video => video.ref);
        if (selectedVideoRefs.length === 0) {
            Swal.fire('No videos selected!', 'Please select at least one video to delete.', 'warning');
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover the deleted videos!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete them!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Promise.all(selectedVideoRefs.map(videoRef => deleteObject(videoRef)));
                    setVideos(prevVideos => prevVideos.filter(video => !selectedVideoRefs.includes(video.ref)));
                    Swal.fire(
                        'Deleted!',
                        'Selected videos have been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error removing videos:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to delete the videos!'
                    });
                }
            }
        });
    };

    const handleDownloadSelectedVideos = async () => {
        const selectedVideos = videos.filter(video => video.selected);

        if (selectedVideos.length === 0) {
            Swal.fire('No videos selected!', 'Please select at least one video to download.', 'warning');
            return;
        }

        Swal.fire({
            title: 'Processing...',
            text: 'Preparing videos for download, please wait.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const cloudinaryUrls = await Promise.all(selectedVideos.map(async video => {
                const formData = new FormData();
                formData.append('file', video.url);
                formData.append('upload_preset', 'tvfer9dl');

                const response = await axios.post('https://api.cloudinary.com/v1_1/drgrcajhq/video/upload',
                    formData);
                return response.data.secure_url;
            }));

            cloudinaryUrls.forEach(url => saveAs(url, url.split('/').pop()));

            Swal.fire(
                'Download Complete!',
                'Selected Videos have been downloaded.',
                'success'
            );
        } catch (error) {
            console.error('Failed to upload or download the videos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to upload or download the videos!'
            });
        }
    };


    return (
        <>
            <div className='upload-image-container' style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover' }}>
                <div className='h-100 py-5 pb-5' style={{ overflowX: "hidden" }}>
                    <div className="d-flex align-items-center mb-3" style={{ justifyContent: "flex-start" }}>
                        <h1 className="title-upload" style={{
                            margin: 'auto', textAlign: "center", justifyContent: "center",
                            display: "flex", color: "white",
                        }}>
                            <IoIosArrowBack style={{ cursor: 'pointer', marginRight: 'auto' }} size={50} onClick={() => navigate("/view_media")} />
                            Videos
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
                            <button className="btn btn-danger"
                                onClick={handleDeleteSelectedVideos}
                                disabled={!atLeastOneSelected}
                            >
                                Delete Videos
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={handleDownloadSelectedVideos}
                                disabled={!atLeastOneSelected}
                                style={{ background: "#4B5320", color: "white" }}
                            >
                                Download Videos
                            </button>

                        </div>
                    </div>
                    <div className='view-images-row mt-3'>
                        {loading ? <p>Loading videos...</p> : (
                           videos.map((video, index) => (
                            <div key={`${index}-${video.selected}`} className=""> {/* Update key to force re-render */}
                                <div className="container" style={{ position: 'relative' }}>
                                    <Checkbox
                                        {...label}
                                        checked={video.selected}
                                        onChange={() => handleVideoSelect(index)}
                                        style={{ position: 'absolute', top: 0, right: 40, zIndex: 1 }}
                                    />
                                        <video controls className="media-img"
                                            src={video.url} alt={`Uploaded ${index}`}
                                            style={{ width: "300px", height: "300px" }}
                                        />
                                        <button className="btn btn-danger mt-2"
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
