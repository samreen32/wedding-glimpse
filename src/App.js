import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Main from "./components/Home/Main";
import UploadImages from "./components/Home/HomeSections/UploadImages";
import UploadVideos from "./components/Home/HomeSections/UploadVideos";
import Login from "./components/AuthScreens/Login"
import ViewMedia from "./components/Home/HomeSections/ViewImages";
import ViewImages from "./components/Home/HomeSections/ViewImages";
import ViewVideos from "./components/Home/HomeSections/ViewVideos";
import OptionMedia from "./components/Home/HomeSections/OptionMedia";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/upload_images" element={<UploadImages />} />
          <Route exact path="/upload_videos" element={<UploadVideos />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/view_media" element={<OptionMedia />} />
          <Route exact path="/view_images" element={<ViewImages />} />
          <Route exact path="/view_videos" element={<ViewVideos />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;