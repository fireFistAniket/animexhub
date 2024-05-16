"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const anify = new extensions_1.ANIME.Anify();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the Anify provider: check out the provider's website @ https://anify.tv/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/anify',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await anify.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await anify
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
        const episodeNumber = request.query.episodeNumber;
        const animeId = request.query.animeId;
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'episodeId is required' });
        if (typeof episodeNumber === 'undefined')
            return reply.status(400).send({ message: 'episodeNumber is required' });
        if (typeof animeId === 'undefined')
            return reply.status(400).send({ message: 'animeId is required' });
        try {
            const res = await anify
                .fetchEpisodeSources(episodeId, Number(episodeNumber), Number(animeId))
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
