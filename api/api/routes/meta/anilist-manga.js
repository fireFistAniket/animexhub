"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const extensions_2 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    // TODO: Allocate new provider per request rather
    // than global
    let anilist = new extensions_1.META.Anilist.Manga();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: `Welcome to the anilist manga provider: check out the provider's website @ ${anilist.provider.toString.baseUrl}`,
            routes: ['/:query', '/info', '/read'],
            documentation: 'https://docs.consumet.org/#tag/anilist',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await anilist.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/info/:id', async (request, reply) => {
        const id = request.params.id;
        const provider = request.query.provider;
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_2.PROVIDERS_LIST.MANGA.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            anilist = new extensions_1.META.Anilist.Manga(possibleProvider);
        }
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await anilist
                .fetchMangaInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
            anilist = new extensions_1.META.Anilist.Manga();
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/read', async (request, reply) => {
        const chapterId = request.query.chapterId;
        const provider = request.query.provider;
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_2.PROVIDERS_LIST.MANGA.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            anilist = new extensions_1.META.Anilist.Manga(possibleProvider);
        }
        if (typeof chapterId === 'undefined')
            return reply.status(400).send({ message: 'chapterId is required' });
        try {
            const res = await anilist
                .fetchChapterPages(chapterId)
                .catch((err) => reply.status(404).send({ message: err.message }));
            anilist = new extensions_1.META.Anilist.Manga();
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
