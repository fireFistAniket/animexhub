"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const mangapill = new extensions_1.MANGA.MangaPill();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: `Welcome to the Mangapill provider: check out the provider's website @ ${mangapill.toString.baseUrl}`,
            routes: ['/:query', '/info', '/read'],
            documentation: 'https://docs.consumet.org/#tag/mangapill',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await mangapill.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await mangapill.fetchMangaInfo(id);
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
            const res = await mangapill
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
