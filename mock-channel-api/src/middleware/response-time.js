'use strict';

/**
 * Measures processing time using high-resolution timer and sets the
 * X-Response-Time header (in milliseconds, two decimal places).
 * Intercepts res.end() to write the header before the response is flushed.
 */
function responseTime(req, res, next) {
  const startAt = process.hrtime.bigint();

  const originalEnd = res.end.bind(res);
  res.end = function (...args) {
    const durationNs = process.hrtime.bigint() - startAt;
    const durationMs = (Number(durationNs) / 1e6).toFixed(2);
    if (!res.headersSent) {
      res.setHeader('X-Response-Time', `${durationMs}ms`);
    }
    return originalEnd(...args);
  };

  next();
}

module.exports = responseTime;
