import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import ArtistsView from "./views/ArtistsView";
import GenresView from "./views/GenresView";
import SongsView from "./views/SongsView";
import SongView from "./views/SongView";
import ArtistView from "./views/ArtistView";
import PlaylistView from "./views/PlaylistView";
import LoginView from "./views/LoginView";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/artists" element={<ArtistsView />} />
        <Route path="/artists/:id" element={<ArtistView />} />
        <Route path="/genres" element={<GenresView />} />
        <Route path="/songs" element={<SongsView />} />
        <Route path="/songs/:id" element={<SongView />} />
        <Route path="/playlists" element={<PlaylistView />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
