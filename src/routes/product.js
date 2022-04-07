'use scrict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');
const auth = require('../services/auth');

router.get('/', auth.authorize, controller.get);
router.get('/:title', auth.authorize, controller.getByTitle);
router.get('/slug/:slug', auth.authorize, controller.getBySlug);
router.get('/tags/:tag', auth.authorize, controller.getByTag);
router.get('/admin/:id', auth.authorize, controller.getById);
router.post('/', auth.authorize, controller.post);
router.put('/:id', auth.authorize, controller.put);
router.delete('/', auth.authorize, controller.delete);
router.put('/active/:id', auth.authorize, controller.active);
module.exports = router;