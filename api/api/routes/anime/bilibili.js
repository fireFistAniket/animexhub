"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    if (!process.env.BILIBILI_COOKIE)
        return;
    const bilibili = new extensions_1.ANIME.Bilibili(process.env.BILIBILI_COOKIE);
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the bilibili provider: check out the provider's website @ https://bilibili.to/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/bilibili',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await bilibili.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await bilibili
                .fetchAnimeInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
    fastify.get('/watch', async (request, reply) => {
        const episodeId = request.query.episodeId;
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'episodeId is required' });
        try {
            const res = await bilibili
                .fetchEpisodeSources(episodeId)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
};
exports.default = routes;
