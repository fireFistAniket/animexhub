"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const main_1 = require("../../main");
const routes = async (fastify, options) => {
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the tmdb provider: check out the provider's website @ https://www.themoviedb.org/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/tmdb',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page;
        const tmdb = new extensions_1.META.TMDB(main_1.tmdbApi);
        const res = await tmdb.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/info/:id', async (request, reply) => {
        const id = request.params.id;
        const type = request.query.type;
        const provider = request.query.provider;
        let tmdb = new extensions_1.META.TMDB(main_1.tmdbApi);
        if (!type)
            return reply.status(400).send({ message: "The 'type' query is required" });
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_1.PROVIDERS_LIST.MOVIES.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            tmdb = new extensions_1.META.TMDB(main_1.tmdbApi, possibleProvider);
        }
        const res = await tmdb.fetchMediaInfo(id, type);
        reply.status(200).send(res);
    });
    fastify.get('/trending', async (request, reply) => {
        const validTimePeriods = new Set(['day', 'week']);
        const type = request.query.type || 'all';
        let timePeriod = request.query.timePeriod || 'day';
        // make day as default time period
        if (!validTimePeriods.has(timePeriod))
            timePeriod = 'day';
        const page = request.query.page || 1;
        const tmdb = new extensions_1.META.TMDB(main_1.tmdbApi);
        try {
            const res = await tmdb.fetchTrending(type, timePeriod, page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply.status(500).send({ message: 'Failed to fetch trending media.' });
        }
    });
    fastify.get('/watch/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        const id = request.query.id;
        const provider = request.query.provider;
        let tmdb = new extensions_1.META.TMDB(main_1.tmdbApi);
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_1.PROVIDERS_LIST.MOVIES.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            tmdb = new extensions_1.META.TMDB(main_1.tmdbApi, possibleProvider);
        }
        try {
            const res = await tmdb
                .fetchEpisodeSources(episodeId, id)
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
