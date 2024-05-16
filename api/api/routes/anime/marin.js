"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const marin = new extensions_1.ANIME.Marin();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the animefox provider: check out the provider's website @ https://marin,moe",
            routes: ['/:query', '/info/:id', '/watch/:id/:number'],
            documentation: 'https://docs.consumet.org/#tag/marin',
        });
    });
    fastify.get('/recent-episodes', async (request, reply) => {
        const page = request.query.page;
        reply.status(200).send(await marin.recentEpisodes(page));
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await marin.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/info/:id', async (request, reply) => {
        const id = request.params.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await marin
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
    fastify.get('/watch/:id/:number', async (request, reply) => {
        const id = request.params.id;
        const number = request.params.number;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        if (typeof number === 'undefined')
            return reply.status(400).send({ message: 'number is required' });
        try {
            const res = await marin
                .fetchEpisodeSources(`${id}/${number}`)
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
