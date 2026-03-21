'use strict';

const fs = require('fs');
const path = require('path');
const { Router } = require('express');

const router = Router();
const DATA_FILE = path.join(__dirname, '../../data/publications.json');

/** Load publications from the JSON file. */
function loadPublications() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

/**
 * Persist updated publications back to the JSON file.
 * NOTE: This is intentionally simple synchronous I/O suitable for a mock/dev service.
 * Under high concurrency, concurrent writes may race. This is acceptable here since
 * the mock is designed for single-developer use and not production load.
 */
function savePublications(publications) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(publications, null, 2), 'utf8');
}

/** Returns a random integer between min and max (inclusive). */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Simulate network latency: 200-2000 ms. */
function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, randomInt(200, 2000)));
}

// ---------------------------------------------------------------------------
// GET /publications
// ---------------------------------------------------------------------------
router.get('/publications', (req, res) => {
  const publications = loadPublications();

  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const total = publications.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = publications.slice(start, start + limit);

  res.json({
    data,
    pagination: {
      page,
      limit,
      total,
      total_pages: totalPages,
    },
  });
});

// ---------------------------------------------------------------------------
// GET /publications/:id
// ---------------------------------------------------------------------------
router.get('/publications/:id', (req, res) => {
  const publications = loadPublications();
  const publication = publications.find((p) => p.id === req.params.id);

  if (!publication) {
    return res.status(404).json({
      error: 'Publication not found',
      code: 'PUBLICATION_NOT_FOUND',
    });
  }

  res.json({ data: publication });
});

// ---------------------------------------------------------------------------
// PUT /publications/:id/variants/:variant_id/stock
// ---------------------------------------------------------------------------
router.put('/publications/:id/variants/:variant_id/stock', async (req, res) => {
  // 1. Simulate variable latency (200-2000 ms)
  await simulateLatency();

  // 2. ~30% random failure
  if (Math.random() < 0.3) {
    return res.status(503).json({
      error: 'Service temporarily unavailable',
      code: 'CHANNEL_UNAVAILABLE',
      retry_after_ms: randomInt(1000, 4000),
    });
  }

  // 3. Validate payload
  const { stock } = req.body;
  if (stock === undefined || stock === null) {
    return res.status(400).json({
      error: 'Missing required field: stock',
      code: 'VALIDATION_ERROR',
    });
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({
      error: 'Field "stock" must be a non-negative integer',
      code: 'VALIDATION_ERROR',
    });
  }

  // 4. Find publication
  const publications = loadPublications();
  const pubIndex = publications.findIndex((p) => p.id === req.params.id);

  if (pubIndex === -1) {
    return res.status(404).json({
      error: 'Publication not found',
      code: 'PUBLICATION_NOT_FOUND',
    });
  }

  const publication = publications[pubIndex];

  // 5. Find variant within publication
  const variantIndex = publication.variants.findIndex(
    (v) => v.id === req.params.variant_id
  );

  if (variantIndex === -1) {
    return res.status(404).json({
      error: 'Variant not found',
      code: 'VARIANT_NOT_FOUND',
    });
  }

  // 6. Update variant stock
  const previousStock = publication.variants[variantIndex].stock;
  const syncedAt = new Date().toISOString();
  publication.variants[variantIndex].stock = stock;
  publication.variants[variantIndex].last_synced_at = syncedAt;

  // 7. Persist changes
  savePublications(publications);

  // 8. Return updated publication with sync metadata
  res.json({
    data: publications[pubIndex],
    meta: {
      variant_id: req.params.variant_id,
      previous_stock: previousStock,
      new_stock: stock,
      synced_at: syncedAt,
    },
  });
});

module.exports = router;
