import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { addSongToPlaylist } from "./api";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutDialog from "./components/AboutDialog";
import HomeView from "./views/HomeView";
import ArtistsView from "./views/ArtistsView";
import ArtistView from "./views/ArtistView";
import GenresView from "./views/GenresView";
import GenreView from "./views/GenreView";
import SongsView from "./views/SongsView";
import SongView from "./views/SongView";
import PlaylistView from "./views/PlaylistView";
import LoginView from "./views/LoginView";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentPlaylistCount, setCurrentPlaylistCount] = useState(0);

const handleAddToPlaylist = (song) => {
  if (!currentPlaylist) {
    toast.error("Please select a playlist first!");
    return;
  }
  addSongToPlaylist(currentPlaylist.id, song.song_id).then(() => {
    setCurrentPlaylistCount(prev => prev + 1);
    toast.success(`Added "${song.title}" to ${currentPlaylist.name}!`);
  });
};

  return (
    <BrowserRouter>
      <Header 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        playlistCount={currentPlaylistCount}
        setAboutOpen={setAboutOpen}
      />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/artists" element={<ArtistsView />} />
        <Route path="/artists/:id" element={<ArtistView onAddToPlaylist={handleAddToPlaylist} />} />
        <Route path="/genres" element={<GenresView />} />
        <Route path="/genres/:id" element={<GenreView onAddToPlaylist={handleAddToPlaylist} />} />
        <Route path="/songs" element={<SongsView onAddToPlaylist={handleAddToPlaylist} />} />
        <Route path="/songs/:id" element={<SongView onAddToPlaylist={handleAddToPlaylist} />} />
        <Route path="/playlists" element={<PlaylistView setCurrentPlaylist={setCurrentPlaylist} setCurrentPlaylistCount={setCurrentPlaylistCount}/>} />
        <Route path="/login" element={<LoginView setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
      <Footer />
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          classNames: {
            toast: "!bg-zinc-900 !border-2 !border-violet-500 !text-white",
            title: "!text-white",
            description: "!text-zinc-400",
          }
        }}
      />
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </BrowserRouter>
  );
}