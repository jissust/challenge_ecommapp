'use strict';

/**
 * Logs a structured entry for each completed request.
 */
function requestLogger(req, res, next) {
  const startAt = process.hrtime.bigint();

  res.on('finish', () => {
    const durationNs = process.hrtime.bigint() - startAt;
    const durationMs = (Number(durationNs) / 1e6).toFixed(2);

    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        requestId: req.requestId,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${durationMs}ms`,
      })
    );
  });

  next();
}

module.exports = requestLogger;
