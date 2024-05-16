"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const anilist_1 = __importDefault(require("@consumet/extensions/dist/providers/meta/anilist"));
const models_2 = require("@consumet/extensions/dist/models");
const cache_1 = __importDefault(require("../../utils/cache"));
const main_1 = require("../../main");
const _9anime_1 = __importDefault(require("@consumet/extensions/dist/providers/anime/9anime"));
const routes = async (fastify, options) => {
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the anilist provider: check out the provider's website @ https://anilist.co/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/anilist',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const anilist = generateAnilistMeta();
        const query = request.params.query;
        const page = request.query.page;
        const perPage = request.query.perPage;
        const res = await anilist.search(query, page, perPage);
        reply.status(200).send(res);
    });
    fastify.get('/advanced-search', async (request, reply) => {
        const query = request.query.query;
        const page = request.query.page;
        const perPage = request.query.perPage;
        const type = request.query.type;
        let genres = request.query.genres;
        const id = request.query.id;
        const format = request.query.format;
        let sort = request.query.sort;
        const status = request.query.status;
        const year = request.query.year;
        const season = request.query.season;
        const anilist = generateAnilistMeta();
        if (genres) {
            JSON.parse(genres).forEach((genre) => {
                if (!Object.values(models_1.Genres).includes(genre)) {
                    return reply.status(400).send({ message: `${genre} is not a valid genre` });
                }
            });
            genres = JSON.parse(genres);
        }
        if (sort)
            sort = JSON.parse(sort);
        if (season)
            if (!['WINTER', 'SPRING', 'SUMMER', 'FALL'].includes(season))
                return reply.status(400).send({ message: `${season} is not a valid season` });
        const res = await anilist.advancedSearch(query, type, page, perPage, format, sort, genres, id, year, status, season);
        reply.status(200).send(res);
    });
    fastify.get('/trending', async (request, reply) => {
        const page = request.query.page;
        const perPage = request.query.perPage;
        const anilist = generateAnilistMeta();
        main_1.redis
            ? reply
                .status(200)
                .send(await cache_1.default.fetch(main_1.redis, `anilist:trending;${page};${perPage}`, async () => await anilist.fetchTrendingAnime(page, perPage), 60 * 60))
            : reply.status(200).send(await anilist.fetchTrendingAnime(page, perPage));
    });
    fastify.get('/popular', async (request, reply) => {
        const page = request.query.page;
        const perPage = request.query.perPage;
        const anilist = generateAnilistMeta();
        main_1.redis
            ? reply
                .status(200)
                .send(await cache_1.default.fetch(main_1.redis, `anilist:popular;${page};${perPage}`, async () => await anilist.fetchPopularAnime(page, perPage), 60 * 60))
            : reply.status(200).send(await anilist.fetchPopularAnime(page, perPage));
    });
    fastify.get('/airing-schedule', async (request, reply) => {
        const page = request.query.page;
        const perPage = request.query.perPage;
        const weekStart = request.query.weekStart;
        const weekEnd = request.query.weekEnd;
        const notYetAired = request.query.notYetAired;
        const anilist = generateAnilistMeta();
        const _weekStart = Math.ceil(Date.now() / 1000);
        const res = await anilist.fetchAiringSchedule(page ?? 1, perPage ?? 20, weekStart ?? _weekStart, weekEnd ?? _weekStart + 604800, notYetAired ?? true);
        reply.status(200).send(res);
    });
    fastify.get('/genre', async (request, reply) => {
        const genres = request.query.genres;
        const page = request.query.page;
        const perPage = request.query.perPage;
        const anilist = generateAnilistMeta();
        if (typeof genres === 'undefined')
            return reply.status(400).send({ message: 'genres is required' });
        JSON.parse(genres).forEach((genre) => {
            if (!Object.values(models_1.Genres).includes(genre)) {
                return reply.status(400).send({ message: `${genre} is not a valid genre` });
            }
        });
        const res = await anilist.fetchAnimeGenres(JSON.parse(genres), page, perPage);
        reply.status(200).send(res);
    });
    fastify.get('/recent-episodes', async (request, reply) => {
        const provider = request.query.provider;
        const page = request.query.page;
        const perPage = request.query.perPage;
        const anilist = generateAnilistMeta(provider);
        const res = await anilist.fetchRecentEpisodes(provider, page, perPage);
        reply.status(200).send(res);
    }),
        fastify.get('/random-anime', async (request, reply) => {
            const anilist = generateAnilistMeta();
            const res = await anilist.fetchRandomAnime().catch((err) => {
                return reply.status(404).send({ message: 'Anime not found' });
            });
            reply.status(200).send(res);
        });
    fastify.get('/servers/:id', async (request, reply) => {
        const id = request.params.id;
        const provider = request.query.provider;
        let anilist = generateAnilistMeta(provider);
        const res = await anilist.fetchEpisodeServers(id);
        anilist = new extensions_1.META.Anilist();
        reply.status(200).send(res);
    });
    fastify.get('/episodes/:id', async (request, reply) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const id = request.params.id;
        const provider = request.query.provider;
        let fetchFiller = request.query.fetchFiller;
        let dub = request.query.dub;
        const locale = request.query.locale;
        let anilist = generateAnilistMeta(provider);
        if (dub === 'true' || dub === '1')
            dub = true;
        else
            dub = false;
        if (fetchFiller === 'true' || fetchFiller === '1')
            fetchFiller = true;
        else
            fetchFiller = false;
        try {
            main_1.redis
                ? reply
                    .status(200)
                    .send(await cache_1.default.fetch(main_1.redis, `anilist:episodes;${id};${dub};${fetchFiller};${anilist.provider.name.toLowerCase()}`, async () => anilist.fetchEpisodesListById(id, dub, fetchFiller), dayOfWeek === 0 || dayOfWeek === 6 ? 60 * 120 : (60 * 60) / 2))
                : reply
                    .status(200)
                    .send(await anilist.fetchEpisodesListById(id, dub, fetchFiller));
        }
        catch (err) {
            return reply.status(404).send({ message: 'Anime not found' });
        }
    });
    // anilist info without episodes
    fastify.get('/data/:id', async (request, reply) => {
        const id = request.params.id;
        const anilist = generateAnilistMeta();
        const res = await anilist.fetchAnilistInfoById(id);
        reply.status(200).send(res);
    });
    // anilist info with episodes
    fastify.get('/info/:id', async (request, reply) => {
        const id = request.params.id;
        const today = new Date();
        const dayOfWeek = today.getDay();
        const provider = request.query.provider;
        let fetchFiller = request.query.fetchFiller;
        let isDub = request.query.dub;
        const locale = request.query.locale;
        let anilist = generateAnilistMeta(provider);
        if (isDub === 'true' || isDub === '1')
            isDub = true;
        else
            isDub = false;
        if (fetchFiller === 'true' || fetchFiller === '1')
            fetchFiller = true;
        else
            fetchFiller = false;
        try {
            main_1.redis
                ? reply
                    .status(200)
                    .send(await cache_1.default.fetch(main_1.redis, `anilist:info;${id};${isDub};${fetchFiller};${anilist.provider.name.toLowerCase()}`, async () => anilist.fetchAnimeInfo(id, isDub, fetchFiller), dayOfWeek === 0 || dayOfWeek === 6 ? 60 * 120 : (60 * 60) / 2))
                : reply
                    .status(200)
                    .send(await anilist.fetchAnimeInfo(id, isDub, fetchFiller));
        }
        catch (err) {
            reply.status(500).send({ message: err.message });
        }
    });
    // anilist character info
    fastify.get('/character/:id', async (request, reply) => {
        const id = request.params.id;
        const anilist = generateAnilistMeta();
        const res = await anilist.fetchCharacterInfoById(id);
        reply.status(200).send(res);
    });
    fastify.get('/watch/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        const provider = request.query.provider;
        const server = request.query.server;
        if (server && !Object.values(models_2.StreamingServers).includes(server))
            return reply.status(400).send('Invalid server');
        let anilist = generateAnilistMeta(provider);
        try {
            main_1.redis
                ? reply
                    .status(200)
                    .send(await cache_1.default.fetch(main_1.redis, `anilist:watch;${episodeId};${anilist.provider.name.toLowerCase()};${server}`, async () => anilist.fetchEpisodeSources(episodeId, server), 600))
                : reply.status(200).send(await anilist.fetchEpisodeSources(episodeId, server));
            anilist = new extensions_1.META.Anilist(undefined, {
                url: process.env.PROXY,
            });
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
};
const generateAnilistMeta = (provider = undefined) => {
    if (typeof provider !== 'undefined') {
        let possibleProvider = extensions_1.PROVIDERS_LIST.ANIME.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
        if (possibleProvider instanceof _9anime_1.default) {
            possibleProvider = new extensions_1.ANIME.NineAnime(process.env?.NINE_ANIME_HELPER_URL, {
                url: process.env?.NINE_ANIME_PROXY,
            }, process.env?.NINE_ANIME_HELPER_KEY);
        }
        return new extensions_1.META.Anilist(possibleProvider, {
            url: process.env.PROXY,
        });
    }
    else {
        return new anilist_1.default(undefined, {
            url: process.env.PROXY,
        });
    }
};
exports.default = routes;
