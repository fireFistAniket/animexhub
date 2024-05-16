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
    const gogoanime = new extensions_1.ANIME.Gogoanime();
    const redisCacheTime = 60 * 60;
    const redisPrefix = 'gogoanime:';
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the gogoanime provider: check out the provider's website @ https://www1.gogoanime.bid/",
            routes: [
                '/:query',
                '/info/:id',
                '/watch/:episodeId',
                '/servers/:episodeId',
                '/genre/:genre',
                '/genre/list',
                '/top-airing',
                '/movies',
                '/popular',
                '/recent-episodes',
                '/anime-list',
                '/download',
            ],
            documentation: 'https://docs.consumet.org/#tag/gogoanime',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page || 1;
        const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}search;${page};${query}`, async () => await gogoanime.search(query, page), redisCacheTime) : await gogoanime.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/info/:id', async (request, reply) => {
        const id = decodeURIComponent(request.params.id);
        try {
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}info;${id}`, async () => await gogoanime
                .fetchAnimeInfo(id)
                .catch((err) => reply.status(404).send({ message: err })), redisCacheTime) : await gogoanime
                .fetchAnimeInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/genre/:genre', async (request, reply) => {
        const genre = request.params.genre;
        const page = request.query.page ?? 1;
        try {
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}genre;${page};${genre}`, async () => await gogoanime
                .fetchGenreInfo(genre, page)
                .catch((err) => reply.status(404).send({ message: err })), redisCacheTime) : await gogoanime
                .fetchGenreInfo(genre, page)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/genre/list', async (request, reply) => {
        try {
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}genre-list`, async () => await gogoanime
                .fetchGenreList()
                .catch((err) => reply.status(404).send({ message: err })), redisCacheTime * 24) : await gogoanime
                .fetchGenreList()
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/watch/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        const server = request.query.server;
        if (server && !Object.values(models_1.StreamingServers).includes(server)) {
            reply.status(400).send('Invalid server');
        }
        try {
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}watch;${server};${episodeId}`, async () => await gogoanime
                .fetchEpisodeSources(episodeId, server)
                .catch((err) => reply.status(404).send({ message: err })), redisCacheTime) : await gogoanime
                .fetchEpisodeSources(episodeId, server)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/servers/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        try {
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}servers;${episodeId}`, async () => await gogoanime
                .fetchEpisodeServers(episodeId)
                .catch((err) => reply.status(404).send({ message: err })), redisCacheTime) : await gogoanime
                .fetchEpisodeServers(episodeId)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/top-airing', async (request, reply) => {
        try {
            const page = request.query.page ?? 1;
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}top-airing;${page}`, async () => await gogoanime.fetchTopAiring(page), redisCacheTime) : await gogoanime.fetchTopAiring(page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    });
    fastify.get('/movies', async (request, reply) => {
        try {
            const page = request.query.page ?? 1;
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}movies;${page}`, async () => await gogoanime.fetchRecentMovies(page), redisCacheTime) : await gogoanime.fetchRecentMovies(page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    });
    fastify.get('/popular', async (request, reply) => {
        try {
            const page = request.query.page ?? 1;
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}popular;${page}`, async () => await gogoanime.fetchPopular(page), redisCacheTime) : await gogoanime.fetchPopular(page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    });
    fastify.get('/recent-episodes', async (request, reply) => {
        try {
            const type = request.query.type ?? 1;
            const page = request.query.page ?? 1;
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}recent-episodes;${page};${type}`, async () => await gogoanime.fetchRecentEpisodes(page, type), redisCacheTime) : await gogoanime.fetchRecentEpisodes(page, type);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    });
    fastify.get('/anime-list', async (request, reply) => {
        try {
            const page = request.query.page ?? 1;
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `gogoanime:anime-list;${page}`, async () => await gogoanime.fetchAnimeList(page), redisCacheTime) : await gogoanime.fetchAnimeList(page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    });
    fastify.get('/download', async (request, reply) => {
        try {
            const downloadLink = request.query.link;
            if (!downloadLink) {
                reply.status(400).send('Invalid link');
            }
            const res = main_1.redis ? await cache_1.default.fetch(main_1.redis, `${redisPrefix}download-${downloadLink}`, async () => await gogoanime
                .fetchDirectDownloadLink(downloadLink)
                .catch((err) => reply.status(404).send({ message: err })), redisCacheTime * 24) : await gogoanime
                .fetchDirectDownloadLink(downloadLink, process.env.RECAPTCHATOKEN ?? '')
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
};
exports.default = routes;
