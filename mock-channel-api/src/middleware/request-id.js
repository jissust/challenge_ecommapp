'use strict';

const { randomUUID } = require('crypto');

/**
 * Assigns a unique request ID to each incoming request.
 * Reuses the incoming X-Request-Id header if present.
 */
function requestId(req, res, next) {
  const incomingId = req.headers['x-request-id'];
  req.requestId = incomingId || randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  next();
}

module.exports = requestId;
