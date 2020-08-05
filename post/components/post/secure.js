const auth = require('../../../auth');
const controller = require('./index');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'create':
                auth.check.logged(req);
                next();
                break;
            case 'edit':
                const post = controller.get(req.body.id);
                auth.check.own(req, post.user);
                next();
                break;
            default:
                next();
        }
    }

    return middleware;
}