'use scrict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer')
const auth = require('../services/auth');

router.get('/', auth.authorize, controller.get);
router.post('/', auth.authorize, controller.post);

//fazer depois
// router.put('/:id', controller.put);
// router.delete('/', controller.delete);

module.exports = router;