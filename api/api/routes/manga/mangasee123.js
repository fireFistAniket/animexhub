"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const mangasee123 = new extensions_1.MANGA.Mangasee123();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: `Welcome to the mangasee123 provider: check out the provider's website @ ${mangasee123.toString.baseUrl}`,
            routes: ['/:query', '/info', '/read'],
            documentation: 'https://docs.consumet.org/#tag/mangasee123',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await mangasee123.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await mangasee123
                .fetchMangaInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/read', async (request, reply) => {
        const chapterId = request.query.chapterId;
        if (typeof chapterId === 'undefined')
            return reply.status(400).send({ message: 'chapterId is required' });
        try {
            const res = await mangasee123
                .fetchChapterPages(chapterId)
                .catch((err) => reply.status(404).send({ message: err.message }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
};
exports.default = routes;
