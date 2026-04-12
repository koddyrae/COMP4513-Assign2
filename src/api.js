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
