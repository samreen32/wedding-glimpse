import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Main from "./components/Home/Main";
import UploadImages from "./components/Home/HomeSections/UploadImages";
import UploadVideos from "./components/Home/HomeSections/UploadVideos";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Login />} /> */}
          <Route exact path="/" element={<Main />} />
          <Route exact path="/upload_images" element={<UploadImages />} />
          <Route exact path="/upload_videos" element={<UploadVideos />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;