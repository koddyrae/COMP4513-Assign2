export default function SongFilter({ 
  artists, 
  genres, 
  titleFilter, 
  setTitleFilter,
  selectedYears,
  toggleYear,
  selectedArtists,
  toggleArtist,
  selectedGenres,
  toggleGenre,
  years
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300">Title</label>
        <input 
          type="text"
          value={titleFilter}
          onChange={e => setTitleFilter(e.target.value)}
          placeholder="Search by title..."
          className="w-full bg-zinc-800 text-white text-sm rounded-md px-3 py-2 border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300">Years</label>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {years.map(year => (
            <label key={year} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-white">
              <input 
                type="checkbox"
                checked={selectedYears.includes(year)}
                onChange={() => toggleYear(year)}
                className="accent-violet-500 w-4 h-4 cursor-pointer"
              />
              {year}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300">Artists</label>
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
          {artists.map(artist => (
            <label key={artist.artist_id} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-white">
              <input 
                type="checkbox"
                checked={selectedArtists.includes(artist.artist_id)}
                onChange={() => toggleArtist(artist.artist_id)}
                className="accent-violet-500 w-4 h-4 cursor-pointer"
              />
              {artist.artist_name}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300">Genres</label>
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
          {genres.map(genre => (
            <label key={genre.genre_id} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-white">
              <input 
                type="checkbox"
                checked={selectedGenres.includes(genre.genre_id)}
                onChange={() => toggleGenre(genre.genre_id)}
                className="accent-violet-500 w-4 h-4 cursor-pointer"
              />
              {genre.genre_name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}