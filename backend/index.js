// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/youtube", require("./routes/youtube"));
// app.use("/api/instagram", require("./routes/instagram"));

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const createRateLimiter = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(createRateLimiter());

// Routes
app.use("/api/youtube", require("./routes/youtube"));
app.use("/api/instagram", require("./routes/instagram"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});