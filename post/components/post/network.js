const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

//Routes
router.get('/', list);
router.post('/', secure('create'), upsert);
router.put('/', secure('edit'), upsert);

function list(req, res, next) {
    controller.list()
        .then(posts => response.success(req, res, posts, 200))
        .catch(next);
}

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then(post => response.success(req, res, post, 201))
        .catch(next);
}

module.exports = router;