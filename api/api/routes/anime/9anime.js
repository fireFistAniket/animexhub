"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const routes = async (fastify, options) => {
    const nineanime = new extensions_1.ANIME.NineAnime(process.env.NINE_ANIME_HELPER_URL, {
        url: process.env.NINE_ANIME_PROXY,
    }, process.env?.NINE_ANIME_HELPER_KEY);
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the 9anime provider: check out the provider's website @ https://9anime.id/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/9anime',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page;
        const res = await nineanime.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/info/:id', async (request, reply) => {
        const id = request.params.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await nineanime.fetchAnimeInfo(id);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
    fastify.get('/watch/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        const server = request.query.server;
        if (server && !Object.values(models_1.StreamingServers).includes(server))
            return reply.status(400).send({ message: 'server is invalid' });
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await nineanime.fetchEpisodeSources(episodeId, server);
            reply.status(200).send(res);
        }
        catch (err) {
            console.error(err);
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
    fastify.get('/servers/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        try {
            const res = await nineanime.fetchEpisodeServers(episodeId);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/helper', async (request, reply) => {
        const actions = ['vrf', 'searchVrf', 'decrypt', 'vizcloud'];
        const action = request.query.action;
        const query = request.query.query;
        if (!action)
            return reply.status(400).send({ message: 'action is invalid' });
        if (typeof query === 'undefined')
            return reply.status(400).send({ message: 'query is required' });
        let res = {};
        try {
            switch (action) {
                case 'vrf':
                    res = await nineanime.ev(query, true);
                    break;
                case 'searchVrf':
                    res = await nineanime.searchVrf(query, true);
                    break;
                case 'decrypt':
                    res = await nineanime.decrypt(query, true);
                    break;
                case 'vizcloud':
                    res = await nineanime.vizcloud(query);
                    break;
                default:
                    res = await nineanime.customRequest(query, action);
                    break;
            }
            reply.status(200).send(res);
        }
        catch (err) {
            console.error(err);
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
};
exports.default = routes;
