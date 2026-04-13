import { useState, useEffect } from "react";
import { getSongs, getArtists, getGenres } from "../api";
import SongList from "../components/SongList";
import SongFilter from "../components/SongFilter";

export default function SongsView({ onAddToPlaylist }) {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleFilter, setTitleFilter] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState("title");

  const years = [...new Set(songs.map(song => song.year))].sort();

  useEffect(() => {
    Promise.all([getSongs(), getArtists(), getGenres()]).then(([songsData, artistsData, genresData]) => {
      setSongs(songsData);
      setArtists(artistsData);
      setGenres(genresData);
      setLoading(false);
    });
  }, []);

  const toggleYear = (year) => {
    setSelectedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const toggleArtist = (id) => {
    setSelectedArtists(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleGenre = (id) => {
    setSelectedGenres(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    setTitleFilter("");
    setSelectedYears([]);
    setSelectedArtists([]);
    setSelectedGenres([]);
  };

  const filteredSongs = songs
    .filter(song => song.title.toLowerCase().includes(titleFilter.toLowerCase()))
    .filter(song => selectedYears.length === 0 || selectedYears.includes(song.year))
    .filter(song => selectedArtists.length === 0 || selectedArtists.includes(song.artist_id))
    .filter(song => selectedGenres.length === 0 || selectedGenres.includes(song.genre_id))
    .sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);

  if (loading) return <p>Loading songs...</p>;

  return (
    <div>
      <h1>Songs</h1>
      <div>
        <SongFilter 
          artists={artists}
          genres={genres}
          years={years}
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          selectedYears={selectedYears}
          toggleYear={toggleYear}
          selectedArtists={selectedArtists}
          toggleArtist={toggleArtist}
          selectedGenres={selectedGenres}
          toggleGenre={toggleGenre}
        />
        <div>
          <label>Sort by</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="artist_name">Artist</option>
          </select>
        </div>
        <div>
          {titleFilter && <span>{titleFilter} <button onClick={() => setTitleFilter("")}>x</button></span>}
          {selectedYears.map(year => (
            <span key={year}>{year} <button onClick={() => toggleYear(year)}>x</button></span>
          ))}
          {selectedArtists.map(id => {
            const artist = artists.find(a => a.artist_id === id);
              return <span key={id}>{artist?.artist_name} <button onClick={() => toggleArtist(id)}>x</button></span>
          })}
          {selectedGenres.map(id => {
            const genre = genres.find(g => g.genre_id === id);
              return <span key={id}>{genre?.genre_name} <button onClick={() => toggleGenre(id)}>x</button></span>
         })}
        </div>
        <button onClick={clearAll}>X Clear All</button>
        <SongList songs={filteredSongs} onAddToPlaylist={onAddToPlaylist} />
      </div>
    </div>
  );
}