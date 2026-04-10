/* * PROJECT: Real-time Group Chat Application
 * TASK 37: WebSockets with Socket.io & React
 * DELIVERABLE: Full-stack Chat App with Typing Indicators
 */

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('https://your-socket-server.herokuapp.com'); // Replace with your backend URL

const RealTimeChat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);
    const [user, setUser] = useState("Aditya");

    useEffect(() => {
        // Listen for incoming messages
        socket.on('message', (payload) => {
            setChat([...chat, payload]);
        });

        // Listen for typing indicator
        socket.on('typing', (isTyping) => {
            setTyping(isTyping);
        });

        return () => socket.off();
    }, [chat]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('message', { user, message });
            setChat([...chat, { user, message }]);
            setMessage('');
            socket.emit('typing', false);
        }
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);
        socket.emit('typing', e.target.value.length > 0);
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                <h2 style={styles.title}>💬 SOIT Group Chat</h2>
                <div style={styles.messageArea}>
                    {chat.map((msg, index) => (
                        <div key={index} style={msg.user === user ? styles.myMsg : styles.otherMsg}>
                            <small>{msg.user}</small>
                            <p>{msg.message}</p>
                        </div>
                    ))}
                    {typing && <p style={styles.typingIndicator}>Someone is typing...</p>}
                </div>
                <form onSubmit={sendMessage} style={styles.inputArea}>
                    <input 
                        value={message} 
                        onChange={handleTyping} 
                        placeholder="Type a message..." 
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Send</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5', fontFamily: 'Arial' },
    chatBox: { width: '400px', height: '500px', background: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    title: { textAlign: 'center', background: '#075e54', color: '#fff', padding: '15px', margin: 0, borderRadius: '10px 10px 0 0' },
    messageArea: { flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
    myMsg: { alignSelf: 'flex-end', background: '#dcf8c6', padding: '8px 15px', borderRadius: '15px 15px 0 15px', maxWidth: '7
