const BASE = "https://comp4513-assign1-tpay.onrender.com/api";

export const getArtists = () =>
  fetch(`${BASE}/artists`).then((resp) => resp.json());

export const getGenres = () =>
  fetch(`${BASE}/genres`).then((resp) => resp.json());

export const getSongs = () =>
  fetch(`${BASE}/songs`).then((resp) => resp.json());

export const getSong = (id) =>
  fetch(`${BASE}/songs/${id}`).then((resp) => resp.json());

export const getArtist = (id) =>
  fetch(`${BASE}/artists/${id}`).then((resp) => resp.json());

export const getSongsByArtist = (id) =>
  fetch(`${BASE}/songs/artist/${id}`).then((resp) => resp.json());

export const getSongsByGenre = (id) =>
  fetch(`${BASE}/songs/genre/${id}`).then((resp) => resp.json());

export const getPlaylists = () =>
  fetch(`${BASE}/playlists`).then((resp) => resp.json());

export const getPlaylistNames = () => fetch(`${BASE}/playlists/names`).then(resp => resp.json());

export const createPlaylist = (name) => fetch(`${BASE}/playlists/create`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name })
}).then(resp => resp.json());

export const getPlaylistSongs = (id) => fetch(`${BASE}/playlists/${id}`).then(resp => resp.json());

export const addSongToPlaylist = (playlistId, songId) => fetch(`${BASE}/playlists/${playlistId}/songs`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ song_id: songId })
}).then(resp => resp.json());

export const removeSongFromPlaylist = (playlistId, songId) => 
  fetch(`${BASE}/playlists/${playlistId}/songs/${songId}`, { method: "DELETE" }).then(resp => resp.json());

export const deletePlaylist = (id) => 
  fetch(`${BASE}/playlists/${id}`, { method: "DELETE" }).then(resp => resp.json());