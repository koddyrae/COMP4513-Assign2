import { useState, useEffect } from "react";
import { getPlaylistNames, createPlaylist, deletePlaylist, getPlaylistSongs, removeSongFromPlaylist } from "../api";
import SongList from "../components/SongList";
import { toast } from "sonner";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PlaylistView({ setCurrentPlaylist, setCurrentPlaylistCount }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlaylistNames().then(async (data) => {
      // fetch song counts for all playlists
      const playlistsWithCounts = await Promise.all(
        data.map(async (pl) => {
          const songs = await getPlaylistSongs(pl.id);
          return { ...pl, count: songs.error ? 0 : songs.length };
        })
      );
      setPlaylists(playlistsWithCounts);
      setLoading(false);
    });
  }, []);

  const handleSelectPlaylist = (pl) => {
    setSelectedPlaylist(pl);
    setCurrentPlaylist(pl);
    getPlaylistSongs(pl.id).then(data => {
      if (data.error) {
        setSelectedSongs([]);
        setCurrentPlaylistCount(0);
      } else {
        setSelectedSongs(data);
        setCurrentPlaylistCount(data.length);
      }
    });
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName).then(data => {
      setPlaylists(prev => [...prev, data]);
      setNewPlaylistName("");
    });
  };

  const handleDeletePlaylist = (id) => {
    deletePlaylist(id).then(() => {
      setPlaylists(prev => prev.filter(p => p.id !== id));
      if (selectedPlaylist?.id === id) {
        setSelectedPlaylist(null);
        setSelectedSongs([]);
      }
    });
  };

  const handleRemoveSong = (songId) => {
    const song = selectedSongs.find(s => s.song_id === songId);
    removeSongFromPlaylist(selectedPlaylist.id, songId).then(() => {
      setSelectedSongs(prev => prev.filter(s => s.song_id !== songId));
      setCurrentPlaylistCount(prev => prev - 1);
      toast.success(`Removed "${song.title}" from ${selectedPlaylist.name}!`);
    });
  };

  if (loading) return <LoadingSpinner message="Loading playlists..." />;

  return (
    <div>
      <h1>Playlists</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th># Songs</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {playlists.length === 0 ? (
            <tr>
              <td colSpan="3">No playlists yet.</td>
            </tr>
          ) : (
            playlists.map(pl => (
              <tr 
                key={pl.id} 
                onClick={() => handleSelectPlaylist(pl)}
                style={{ cursor: "pointer", fontWeight: selectedPlaylist?.id === pl.id ? "bold" : "normal" }}
              >
                <td>{pl.name}</td>
                <td>{pl.id === selectedPlaylist?.id ? selectedSongs.length : pl.count}</td>
                <td>
                  <button onClick={(e) => { e.stopPropagation(); handleDeletePlaylist(pl.id); }}>-</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div>
        <label>Name</label>
        <input
          type="text"
          value={newPlaylistName}
          onChange={e => setNewPlaylistName(e.target.value)}
          placeholder="New playlist name..."
        />
        <button onClick={handleCreatePlaylist}>+</button>
      </div>

      {selectedPlaylist && (
        <div>
          <h2>{selectedPlaylist.name}</h2>
          <SongList 
            songs={selectedSongs}
            onRemoveFromPlaylist={handleRemoveSong}
          />
        </div>
      )}
    </div>
  );
}