"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    let mal = new extensions_1.META.Myanimelist();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the mal provider: check out the provider's website @ https://mal.co/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/mal',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page;
        const perPage = request.query.perPage;
        const res = await mal.search(query, page);
        reply.status(200).send(res);
    });
    // mal info with episodes
    fastify.get('/info/:id', async (request, reply) => {
        const id = request.params.id;
        const provider = request.query.provider;
        let fetchFiller = request.query.fetchFiller;
        let isDub = request.query.dub;
        const locale = request.query.locale;
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_1.PROVIDERS_LIST.ANIME.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            mal = new extensions_1.META.Myanimelist(possibleProvider);
        }
        if (isDub === 'true' || isDub === '1')
            isDub = true;
        else
            isDub = false;
        if (fetchFiller === 'true' || fetchFiller === '1')
            fetchFiller = true;
        else
            fetchFiller = false;
        try {
            const res = await mal.fetchAnimeInfo(id, isDub, fetchFiller);
            mal = new extensions_1.META.Myanimelist(undefined);
            reply.status(200).send(res);
        }
        catch (err) {
            reply.status(500).send({ message: err.message });
        }
    });
    fastify.get('/watch/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        const provider = request.query.provider;
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_1.PROVIDERS_LIST.ANIME.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            mal = new extensions_1.META.Myanimelist(possibleProvider);
        }
        try {
            const res = await mal
                .fetchEpisodeSources(episodeId)
                .catch((err) => reply.status(404).send({ message: err }));
            mal = new extensions_1.META.Myanimelist(undefined);
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
