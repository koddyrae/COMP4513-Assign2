import { useState, useEffect } from "react";
import { getSongs, getArtists, getGenres } from "../api";
import SongList from "../components/SongList";
import SongFilter from "../components/SongFilter";
import LoadingSpinner from "../components/LoadingSpinner";

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

  const activeFilters = [
    ...(titleFilter ? [{ label: titleFilter, clear: () => setTitleFilter("") }] : []),
    ...selectedYears.map(year => ({ label: year, clear: () => toggleYear(year) })),
    ...selectedArtists.map(id => ({
      label: artists.find(a => a.artist_id === id)?.artist_name,
      clear: () => toggleArtist(id),
    })),
    ...selectedGenres.map(id => ({
      label: genres.find(g => g.genre_id === id)?.genre_name,
      clear: () => toggleGenre(id),
    })),
  ];

  if (loading) return <LoadingSpinner message="Loading songs..." />;

  return (
    <div className="flex flex-col h-screen overflow-hidden px-8 py-6">
      <h1 className="text-4xl font-bold text-white mb-6">Songs</h1>
      <div className="flex gap-6 flex-1 min-h-0">
        <aside className="w-64 shrink-0 bg-zinc-900 border border-zinc-700 rounded-xl p-5 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Sort By</h2>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full bg-zinc-800 text-white text-sm rounded-md px-3 py-2 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              >
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="artist_name">Artist</option>
              </select>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Filters</h2>
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
            </div>

            {activeFilters.length > 0 && (
              <button
                onClick={clearAll}
                className="w-full text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-md py-2 transition-colors"
              >
                ✕ Clear All
              </button>
            )}
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 shrink-0">
              {activeFilters.map((f, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 bg-zinc-800 text-zinc-200 text-sm px-3 py-1 rounded-full border border-zinc-700"
                >
                  {f.label}
                  <button onClick={f.clear} className="text-zinc-400 hover:text-white ml-1">✕</button>
                </span>
              ))}
            </div>
          )}
          <div className="overflow-y-auto flex-1">
            <SongList songs={filteredSongs} onAddToPlaylist={onAddToPlaylist} />
          </div>
        </div>
      </div>
    </div>
  );
}