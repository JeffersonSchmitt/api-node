'use scrict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')
const auth = require('../services/auth');

router.post('/authenticate', controller.userAuth);
router.post('/refresh-token', auth.authorize, controller.refreshToken);
router.post('/', controller.post);

//fazer depois
// router.put('/:id', controller.put);
// router.delete('/', controller.delete);

module.exports = router;