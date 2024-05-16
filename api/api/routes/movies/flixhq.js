"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const cache_1 = __importDefault(require("../../utils/cache"));
const main_1 = require("../../main");
const routes = async (fastify, options) => {
    const flixhq = new extensions_1.MOVIES.FlixHQ();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the flixhq provider: check out the provider's website @ https://flixhq.to/",
            routes: ['/:query', '/info', '/watch', '/recent-shows', '/recent-movies', '/trending', '/servers'],
            documentation: 'https://docs.consumet.org/#tag/flixhq',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = decodeURIComponent(request.params.query);
        const page = request.query.page;
        let res = main_1.redis
            ? await cache_1.default.fetch(main_1.redis, `flixhq:${query}:${page}`, async () => await flixhq.search(query, page ? page : 1), 60 * 60 * 6)
            : await flixhq.search(query, page ? page : 1);
        reply.status(200).send(res);
    });
    fastify.get('/recent-shows', async (request, reply) => {
        let res = main_1.redis
            ? await cache_1.default.fetch(main_1.redis, `flixhq:recent-shows`, async () => await flixhq.fetchRecentTvShows(), 60 * 60 * 3)
            : await flixhq.fetchRecentTvShows();
        reply.status(200).send(res);
    });
    fastify.get('/recent-movies', async (request, reply) => {
        let res = main_1.redis
            ? await cache_1.default.fetch(main_1.redis, `flixhq:recent-movies`, async () => await flixhq.fetchRecentMovies(), 60 * 60 * 3)
            : await flixhq.fetchRecentMovies();
        reply.status(200).send(res);
    });
    fastify.get('/trending', async (request, reply) => {
        const type = request.query.type;
        try {
            if (!type) {
                const res = {
                    results: [
                        ...(await flixhq.fetchTrendingMovies()),
                        ...(await flixhq.fetchTrendingTvShows()),
                    ],
                };
                return reply.status(200).send(res);
            }
            let res = main_1.redis
                ? await cache_1.default.fetch(main_1.redis, `flixhq:trending:${type}`, async () => type === 'tv'
                    ? await flixhq.fetchTrendingTvShows()
                    : await flixhq.fetchTrendingMovies(), 60 * 60 * 3)
                : type === 'tv'
                    ? await flixhq.fetchTrendingTvShows()
                    : await flixhq.fetchTrendingMovies();
            reply.status(200).send(res);
        }
        catch (error) {
            reply.status(500).send({
                message: 'Something went wrong. Please try again later. or contact the developers.',
            });
        }
    });
    fastify.get('/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({
                message: 'id is required',
            });
        try {
            let res = main_1.redis
                ? await cache_1.default.fetch(main_1.redis, `flixhq:info:${id}`, async () => await flixhq.fetchMediaInfo(id), 60 * 60 * 3)
                : await flixhq.fetchMediaInfo(id);
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
        const mediaId = request.query.mediaId;
        const server = request.query.server;
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'episodeId is required' });
        if (typeof mediaId === 'undefined')
            return reply.status(400).send({ message: 'mediaId is required' });
        if (server && !Object.values(models_1.StreamingServers).includes(server))
            return reply.status(400).send({ message: 'Invalid server query' });
        try {
            let res = main_1.redis
                ? await cache_1.default.fetch(main_1.redis, `flixhq:watch:${episodeId}:${mediaId}:${server}`, async () => await flixhq.fetchEpisodeSources(episodeId, mediaId, server), 60 * 30)
                : await flixhq.fetchEpisodeSources(episodeId, mediaId, server);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/servers', async (request, reply) => {
        const episodeId = request.query.episodeId;
        const mediaId = request.query.mediaId;
        try {
            let res = main_1.redis
                ? await cache_1.default.fetch(main_1.redis, `flixhq:servers:${episodeId}:${mediaId}`, async () => await flixhq.fetchEpisodeServers(episodeId, mediaId), 60 * 30)
                : await flixhq.fetchEpisodeServers(episodeId, mediaId);
            reply.status(200).send(res);
        }
        catch (error) {
            reply.status(500).send({
                message: 'Something went wrong. Please try again later. or contact the developers.',
            });
        }
    });
    fastify.get('/country/:country', async (request, reply) => {
        const country = request.params.country;
        const page = request.query.page ?? 1;
        try {
            let res = main_1.redis
                ? await cache_1.default.fetch(main_1.redis, `flixhq:country:${country}:${page}`, async () => await flixhq.fetchByCountry(country, page), 60 * 60 * 3)
                : await flixhq.fetchByCountry(country, page);
            reply.status(200).send(res);
        }
        catch (error) {
            reply.status(500).send({
                message: 'Something went wrong. Please try again later. or contact the developers.',
            });
        }
    });
    fastify.get('/genre/:genre', async (request, reply) => {
        const genre = request.params.genre;
        const page = request.query.page ?? 1;
        try {
            let res = main_1.redis
                ? await cache_1.default.fetch(main_1.redis, `flixhq:genre:${genre}:${page}`, async () => await flixhq.fetchByGenre(genre, page), 60 * 60 * 3)
                : await flixhq.fetchByGenre(genre, page);
            reply.status(200).send(res);
        }
        catch (error) {
            reply.status(500).send({
                message: 'Something went wrong. Please try again later. or contact the developers.',
            });
        }
    });
};
exports.default = routes;
