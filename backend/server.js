const express = require('express');
const cors = require('cors');
const router = require('./src/routes');
const StartServer = require('./utils/startServer');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack || err);
    const statusCode = err.statusCode || err.code || 500;
    res.status(statusCode).json({
        data: null,
        msg: err.message || "Something went wrong",
        status: false,
        meta: null
    });
});

// Start server + MongoDB
StartServer(app);
