import { Link } from "react-router-dom";

export default function SongList({ songs, onAddToPlaylist, onRemoveFromPlaylist }) {
  if (!songs || songs.length === 0) return <p>No songs found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Year</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {songs.map(song => (
          <tr key={song.song_id}>
            <td>
              <Link to={`/songs/${song.song_id}`}>{song.title}</Link>
            </td>
            <td>
              <Link to={`/artists/${song.artist_id}`}>{song.artist_name}</Link>
            </td>
            <td>{song.year}</td>
            <td>
              {onRemoveFromPlaylist ? (
                <button onClick={() => onRemoveFromPlaylist(song.song_id)}>-</button>
              ) : (
                <button onClick={() => onAddToPlaylist(song)}>+</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}