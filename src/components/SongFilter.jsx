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
    <div>
      <div>
        <label>Title</label>
        <input 
          type="text"
          value={titleFilter}
          onChange={e => setTitleFilter(e.target.value)}
          placeholder="Search by title..."
        />
      </div>
      <div>
        <label>Years</label>
        {years.map(year => (
          <div key={year}>
            <input 
              type="checkbox"
              checked={selectedYears.includes(year)}
              onChange={() => toggleYear(year)}
            />
            <label>{year}</label>
          </div>
        ))}
      </div>

      <div>
        <label>Artists</label>
        {artists.map(artist => (
          <div key={artist.artist_id}>
            <input 
              type="checkbox"
              checked={selectedArtists.includes(artist.artist_id)}
              onChange={() => toggleArtist(artist.artist_id)}
            />
            <label>{artist.artist_name}</label>
          </div>
        ))}
      </div>

      <div>
        <label>Genres</label>
        {genres.map(genre => (
          <div key={genre.genre_id}>
            <input 
              type="checkbox"
              checked={selectedGenres.includes(genre.genre_id)}
              onChange={() => toggleGenre(genre.genre_id)}
            />
            <label>{genre.genre_name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}