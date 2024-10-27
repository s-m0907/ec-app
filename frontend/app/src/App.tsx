import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import Header from "./components/Layout/Header";
import SignIn from "./components/Auth/SignIn";
import BrowseArtworks from "./components/Artwork/BrowseArtworks";
import ExhibitionsPage from "./components/Exhibitions/ExhibitionsPage";
import ExhibitionPage from "./components/ViewExhibition/ExhibitionPage";
import ArtworkPage from "./components/ViewExhibition/ArtworkPage";
import Home from "./components/Home/Home";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/browse-artworks" element={<BrowseArtworks />} />
          <Route path="/:username/exhibitions" element={<ExhibitionsPage />} />
          <Route
            path="/:username/exhibitions/:exhibitionName"
            element={<ExhibitionPage />}
          />
          <Route path="/artworks/:artworkId" element={<ArtworkPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
