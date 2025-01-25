const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/youtube", require("./routes/youtube"));
app.use("/api/instagram", require("./routes/instagram"));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
