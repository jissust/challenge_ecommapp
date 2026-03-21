'use strict';

const express = require('express');
const requestId = require('./middleware/request-id');
const responseTime = require('./middleware/response-time');
const requestLogger = require('./middleware/request-logger');
const publicationsRouter = require('./routes/publications');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(requestId);
app.use(responseTime);
app.use(requestLogger);

// Health check
app.get('/channel/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'mock-channel-api',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/channel', publicationsRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    code: 'NOT_FOUND',
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[error]', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    code: 'INTERNAL_ERROR',
  });
});

app.listen(PORT, () => {
  console.log(`[mock-channel-api] Listening on port ${PORT}`);
});

module.exports = app;
