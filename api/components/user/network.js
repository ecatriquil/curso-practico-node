const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

//Routes
router.get('/', list);
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

//Internal functions
function list(req, res, next) {
    controller.list()
        .then(lista => response.success(req, res, lista, 200))
        // .catch(e => response.error(req, res, e, 500));
        .catch(next);

}

function get(req, res, next) {
    controller.get(req.params.id)
        .then(user => response.success(req, res, user, 200))
        // .catch(e => response.error(req, res, e, 500));
        .catch(next);
}

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then(user => response.success(req, res, user, 201))
        // .catch(e => response.error(req, res, 'Invalid user', 400, e));
        .catch(next);
}

function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
        .then(data => response.success(req, res, data, 201))
        .catch(next);
}

function following(req, res, next) {
    controller.following(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(next);
}

module.exports = router;