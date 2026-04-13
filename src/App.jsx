import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import ArtistsView from "./views/ArtistsView";
import GenresView from "./views/GenresView";
import GenreView from "./views/GenreView";
import SongsView from "./views/SongsView";
import SongView from "./views/SongView";
import ArtistView from "./views/ArtistView";
import PlaylistView from "./views/PlaylistView";
import LoginView from "./views/LoginView";
import AboutDialog from "./components/AboutDialog";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        playlistCount={playlist.length}
        setAboutOpen={setAboutOpen}
      />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/artists" element={<ArtistsView />} />
        <Route path="/artists/:id" element={<ArtistView />} />
        <Route path="/genres" element={<GenresView />} />
        <Route path="/genres/:id" element={<GenreView />} />
        <Route path="/songs" element={<SongsView playlist={playlist} setPlaylist={setPlaylist} />} />
        <Route path="/songs/:id" element={<SongView playlist={playlist} setPlaylist={setPlaylist} />} />
        <Route path="/playlists" element={<PlaylistView playlist={playlist} setPlaylist={setPlaylist} />} />
        <Route path="/login" element={<LoginView setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
      <Footer />
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </BrowserRouter>
  );
}