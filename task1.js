import React, { useState } from 'react';
import axios from 'axios';

/**
 * PROJECT: React Weather Dashboard
 * TASK 35: API Integration & Responsive UI
 * DELIVERABLE: A functional React app using OpenWeatherMap API
 */

const WeatherDashboard = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = "895284a22d0353443572d4d71520623e"; // OpenWeatherMap Key

    const getWeatherData = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await axios.get(url);
            setWeather(response.data);
        } catch (err) {
            setError('City not found. Please try again.');
            setWeather(null);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🌦️ Weather Dashboard</h2>
                <form onSubmit={getWeatherData} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Enter City Name..." 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Search</button>
                </form>

                {error && <p style={styles.error}>{error}</p>}

                {weather && (
                    <div style={styles.weatherInfo}>
                        <h3>{weather.name}, {weather.sys.country}</h3>
                        <h1 style={styles.temp}>{Math.round(weather.main.temp)}°C</h1>
                        <p style={styles.desc}>{weather.weather[0].description.toUpperCase()}</p>
                        <div style={styles.details}>
                            <p>💧 Humidity: {weather.main.humidity}%</p>
                            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Professional CSS-in-JS Styles ---
const styles = {
    container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#2c3e50', fontFamily: 'Arial' },
    card: { background: '#ecf0f1', padding: '30px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', width: '350px', textAlign: 'center' },
    title: { color: '#2980b9', marginBottom: '20px' },
    form: { display: 'flex', gap: '10px' },
    input: { flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #bdc3c7', outline: 'none' },
    button: { background: '#2980b9', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer' },
    weatherInfo: { marginTop: '20px', color: '#34495e' },
    temp: { fontSize: '3rem', margin: '10px 0', color: '#e67e22' },
    desc: { fontWeight: 'bold', color: '#7f8c8d' },
    details: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '0.9rem', borderTop: '1px solid #ddd', paddingTop: '10px' },
    error: { color: 'red', marginTop: '10px' }
};

export default WeatherDashboard;
