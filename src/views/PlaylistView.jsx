import { useState, useEffect } from "react";
import { getPlaylistNames, createPlaylist, deletePlaylist, getPlaylistSongs, removeSongFromPlaylist } from "../api";
import SongList from "../components/SongList";
import { toast } from "sonner";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PlaylistView({ setCurrentPlaylist, setCurrentPlaylistCount }) {
  const [playlists, setPlaylists] = useState([]);
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlaylistNames().then(async (data) => {
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

  const handleTogglePlaylist = (pl) => {
    if (expandedPlaylist?.id === pl.id) {
      setExpandedPlaylist(null);
      return;
    }
    setExpandedPlaylist(pl);
    setCurrentPlaylist(pl);
    getPlaylistSongs(pl.id).then(data => {
      const songs = data.error ? [] : data;
      setPlaylistSongs(prev => ({ ...prev, [pl.id]: songs }));
      setCurrentPlaylistCount(songs.length);
    });
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName).then(data => {
      setPlaylists(prev => [...prev, { ...data, count: 0 }]);
      setNewPlaylistName("");
    });
  };

const handleDeletePlaylist = (id) => {
  const playlist = playlists.find(p => p.id === id);
  deletePlaylist(id).then(() => {
    setPlaylists(prev => prev.filter(p => p.id !== id));
    if (expandedPlaylist?.id === id) {
      setExpandedPlaylist(null);
    }
    toast.success(`Deleted playlist "${playlist.name}"!`);
  });
};
  const handleRemoveSong = (songId) => {
    const songs = playlistSongs[expandedPlaylist.id] || [];
    const song = songs.find(s => s.song_id === songId);
    removeSongFromPlaylist(expandedPlaylist.id, songId).then(() => {
      setPlaylistSongs(prev => ({
        ...prev,
        [expandedPlaylist.id]: prev[expandedPlaylist.id].filter(s => s.song_id !== songId)
      }));
      setPlaylists(prev => prev.map(p =>
        p.id === expandedPlaylist.id ? { ...p, count: p.count - 1 } : p
      ));
      setCurrentPlaylistCount(prev => prev - 1);
      toast.success(`Removed "${song.title}" from ${expandedPlaylist.name}!`);
    });
  };

  if (loading) return <LoadingSpinner message="Loading playlists..." />;

  return (
    <div className="h-full overflow-y-auto px-8 py-6 text-white">
      <h1 className="text-4xl font-bold mb-8">Playlists</h1>

      <div className="flex gap-3 mb-8 max-w-md">
        <input
          type="text"
          value={newPlaylistName}
          onChange={e => setNewPlaylistName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleCreatePlaylist()}
          placeholder="New playlist name..."
          className="flex-1 bg-zinc-800 text-white text-sm rounded-md px-4 py-2 border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
        />
        <button
          onClick={handleCreatePlaylist}
          className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors"
        >
          + Create
        </button>
      </div>

      {playlists.length === 0 ? (
        <p className="text-zinc-400 text-sm">No playlists yet. Create one above!</p>
      ) : (
        <div className="space-y-3">
          {playlists.map(pl => {
            const isExpanded = expandedPlaylist?.id === pl.id;
            const songs = playlistSongs[pl.id] || [];

            return (
              <div key={pl.id} className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">

                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-zinc-800 transition-colors"
                  onClick={() => handleTogglePlaylist(pl)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{isExpanded ? "▾" : "▸"}</span>
                    <span className="font-medium text-violet-400">{pl.name}</span>
                    <span className="text-xs text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
                      {isExpanded ? songs.length : pl.count} songs
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeletePlaylist(pl.id); }}
                    className="text-red-400 hover:text-red-500 text-sm px-2 py-1 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-zinc-700">
                    {songs.length === 0 ? (
                      <p className="text-zinc-400 text-sm px-5 py-4">No songs in this playlist yet.</p>
                    ) : (
                      <SongList
                        songs={songs}
                        onRemoveFromPlaylist={handleRemoveSong}
                      />
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}