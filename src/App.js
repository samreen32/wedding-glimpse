import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Login from "./components/AuthScreens/Login";
import Main from "./components/Home/Main";
import UploadImages from "./components/Home/HomeSections/UploadImages";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Login />} /> */}
          <Route exact path="/" element={<Main />} />
          <Route exact path="/upload_images" element={<UploadImages />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;