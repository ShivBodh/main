const express = require('express'); // Express framework ko import kiya
const path = require('path');       // 'path' module file paths ko handle karne ke liye

const app = express();
// Firebase App Hosting aapko PORT environment variable provide karta hai.
// Agar woh nahi hai, toh hum default 8080 use karenge (local testing ke liye).
const port = process.env.PORT || 8080; 

// -- Static Files Serve Karna --
// Yah line bahut important hai! Yeh Express ko batati hai ki 'public' folder ke andar
// jitni bhi files hain, unhein static files ke roop mein serve karein.
// Jaise agar aapki 'public' folder mein 'index.html', 'style.css', 'script.js' hain,
// toh woh '/index.html', '/style.css', '/script.js' URLs par available honge.
app.use(express.static(path.join(__dirname, 'public')));

// -- Root URL (/) ko Handle Karna --
// Jab koi user aapki website ke root URL (e.g., main--sdhan-suite.asia-east1.hosted.app/)
// par access karta hai, toh yeh route trigger hoga aur 'public/index.html' file bheji jaayegi.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// -- Optional: Ek Simple API Endpoint (test karne ke liye) --
// Aap yeh route add kar sakte hain check karne ke liye ki aapka server theek se kaam kar raha hai.
// Example: main--sdhan-suite.asia-east1.hosted.app/api/hello par visit karein.
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from your Firebase App Hosting backend!' });
});

// Server ko start karein aur specified port par listen karein
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Open your browser at: http://localhost:${port}`); // Local testing ke liye
});
