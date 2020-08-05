const { nanoid } = require('nanoid');
const err = require('../../../utils/error');
// const auth = require('../auth');
const TABLA = 'post';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    async function get(id) {
        const post = await store.get(TABLA, id);

        if (!post) {
            throw error('No existe el post', 404);
        }

        return post;
    }

    async function upsert(body) {
        let exists = false;
        const post = {
            title: body.title,
            user: body.user,
        }

        if (body.id) {
            exists = true;
            post.id = body.id;
        } else {
            post.id = nanoid();
        }

        return store.upsert(TABLA, post, exists);
    }

    return {
        list,
        get,
        upsert,
    }
}