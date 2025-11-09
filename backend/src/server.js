// backend/src/server.js

const app = require('./app');

// Port from env, fallback to 3001 if not set
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
