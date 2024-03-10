import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Adjust if your main component is located elsewhere
import './index.css'; // Adjust if you have a different file for CSS or if it's located elsewhere

const container = document.getElementById('root'); // Ensure the ID matches the ID in your index.html
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
