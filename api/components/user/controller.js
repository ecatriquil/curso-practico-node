const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id)
    }

    async function upsert(body) {
        let exists = false;
        const user = {
            name: body.name,
            username: body.username,
        }

        if (body.id) {
            exists = true;
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            }, exists)
        }

        return store.upsert(TABLA, user, exists);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    function follow(from, to) {
        let exists = false;
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        }, exists)
    }

    async function following(user) {
        const join = {};
        join[TABLA] = 'user_to'; //{user: 'user_to'}
        const query = { user_from: user }
        return await store.query(TABLA + '_follow', query, join);
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following,
    }
}
