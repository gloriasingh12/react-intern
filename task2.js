/* * PROJECT: Movie Search & Favorites App
 * TASK 36: React API Integration with LocalStorage
 * DELIVERABLE: Single-file Responsive Movie Application
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieApp = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [favs, setFavs] = useState(JSON.parse(localStorage.getItem('favs')) || []);

    // Function to search movies from OMDb API
    const searchMovies = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=eb10640f`);
            if (res.data.Search) {
                setMovies(res.data.Search);
            } else {
                alert("Movie not found!");
            }
        } catch (err) {
            console.error("API Error:", err);
        }
    };

    // Function to add/remove favorites
    const toggleFav = (movie) => {
        let updatedFavs;
        if (favs.find(f => f.imdbID === movie.imdbID)) {
            updatedFavs = favs.filter(f => f.imdbID !== movie.imdbID);
        } else {
            updatedFavs = [...favs, movie];
        }
        setFavs(updatedFavs);
        localStorage.setItem('favs', JSON.stringify(updatedFavs));
    };

    return (
        <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Arial' }}>
            <center>
                <h1 style={{ color: '#e50914' }}>🎬 CineSearch</h1>
                <form onSubmit={searchMovies} style={{ marginBottom: '30px' }}>
                    <input 
                        style={{ padding: '10px', width: '250px', borderRadius: '5px 0 0 5px', border: 'none' }}
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Search for a movie..." 
                    />
                    <button type="submit" style={{ padding: '10px', background: '#e50914', color: '#fff', border: 'none', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}>
                        Search
                    </button>
                </form>
            </center>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {movies.map(m => (
                    <div key={m.imdbID} style={{ background: '#222', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                        <img src={m.Poster} alt="poster" style={{ width: '100%', borderRadius: '5px' }} />
                        <h4 style={{ margin: '10px 0' }}>{m.Title}</h4>
                        <button 
                            onClick={() => toggleFav(m)} 
                            style={{ background: favs.find(f => f.imdbID === m.imdbID) ? '#e50914' : '#444', color: '#fff', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
                        >
                            {favs.find(f => f.imdbID === m.imdbID) ? '❤️ Favorite' : '🤍 Add to Fav'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieApp;
