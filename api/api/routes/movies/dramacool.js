"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const dramacool = new extensions_1.MOVIES.DramaCool();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the flixhq provider: check out the provider's website @ https://flixhq.to/",
            routes: ['/:query', '/info', '/watch'],
            documentation: 'https://docs.consumet.org/#tag/flixhq',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = decodeURIComponent(request.params.query);
        const page = request.query.page;
        const res = await dramacool.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({
                message: 'id is required',
            });
        try {
            const res = await dramacool
                .fetchMediaInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply.status(500).send({
                message: 'Something went wrong. Please try again later. or contact the developers.',
            });
        }
    });
    fastify.get('/watch', async (request, reply) => {
        const episodeId = request.query.episodeId;
        // const mediaId = (request.query as { mediaId: string }).mediaId;
        // const server = (request.query as { server: StreamingServers }).server;
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'episodeId is required' });
        try {
            const res = await dramacool
                .fetchEpisodeSources(episodeId)
                .catch((err) => reply.status(404).send({ message: 'Media Not found.' }));
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
