import { Link } from "react-router-dom";

export default function SongList({ songs, onAddToPlaylist, onRemoveFromPlaylist }) {
  if (!songs || songs.length === 0) return (
    <p className="text-zinc-500 text-sm p-4">No songs found.</p>
  );

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-zinc-800">
          <th className="text-left text-zinc-500 font-medium px-4 py-3">Title</th>
          <th className="text-left text-zinc-500 font-medium px-4 py-3">Artist</th>
          <th className="text-left text-zinc-500 font-medium px-4 py-3">Year</th>
          <th className="text-left text-zinc-500 font-medium px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song, index) => (
          <tr 
            key={song.song_id} 
            className={`border-b border-zinc-800 hover:bg-zinc-800 transition ${index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"}`}
          >
            <td className="px-4 py-3">
              <Link 
                to={`/songs/${song.song_id}`} 
                className="text-white hover:text-violet-400 transition"
              >
                {song.title}
              </Link>
            </td>
            <td className="px-4 py-3">
              <Link 
                to={`/artists/${song.artist_id}`} 
                className="text-zinc-400 hover:text-violet-400 transition"
              >
                {song.artist_name}
              </Link>
            </td>
            <td className="px-4 py-3 text-zinc-400">{song.year}</td>
            <td className="px-4 py-3">
              {onRemoveFromPlaylist ? (
                <button 
                  onClick={() => onRemoveFromPlaylist(song.song_id)}
                  className="text-violet-500 hover:text-red-400 transition font-bold text-lg leading-none"
                >
                  −
                </button>
              ) : (
                <button 
                  onClick={() => onAddToPlaylist(song)}
                  className="text-violet-500 hover:text-violet-300 transition font-bold text-lg leading-none"
                >
                  +
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}