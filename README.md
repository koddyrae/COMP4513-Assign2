# COMP 4513 Assignment 2

## Overview

A music discovery web application built with React for exploring Spotify song, artist, and genre data. Users can browse songs, artists, and genres, view detailed song analytics, create and manage playlists, and filter/sort content interactively.

## Built With

- **React** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Recharts** - Data visualizations (radar chart)
- **Sonner** - Toast notifications

## Hosting

Deployed on GitHub Pages: https://koddyrae.github.io/COMP4513-Assign2/

## API

This app consumes the custom REST API built in Assignment 1:
https://comp4513-assign1-tpay.onrender.com

## Views

| View | Description |
| --- | --- |
| Home | Landing page with featured artists and navigation |
| Songs | Browse all songs with sidebar filtering by title, year, artist, and genre |
| Song | Detailed song view with audio profile radar chart and related songs |
| Artists | Browse all artists |
| Artist | Artist detail page with their songs |
| Genres | Browse all genres with cover images |
| Genre | Genre detail page with its songs |
| Playlists | Create, delete, and manage playlists with expandable song lists |
| Login | Login page |

## Features

- Filter songs by title, year, artist, and genre
- Sort songs by title, year, or artist
- View audio analytics (danceability, energy, valence, etc.) as a radar chart
- Related song suggestions based on audio profile similarity
- Create and delete playlists
- Add and remove songs from playlists
- Active filter chips with individual clear buttons
- Toast notifications for playlist actions

## Developer

Koddy Rae Madriaga