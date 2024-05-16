"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const animepahe = new extensions_1.ANIME.AnimePahe();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the animepahe provider: check out the provider's website @ https://animepahe.com/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/animepahe',
        });
    });
    fastify.get('/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await animepahe.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/info/:id', async (request, reply) => {
        const id = decodeURIComponent(request.params.id);
        const episodePage = request.query.episodePage;
        try {
            const res = await animepahe
                .fetchAnimeInfo(id, episodePage)
                .catch((err) => reply.status(404).send({ message: err }));
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
        try {
            const res = await animepahe.fetchEpisodeSources(episodeId);
            reply.status(200).send(res);
        }
        catch (err) {
            console.log(err);
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
};
exports.default = routes;
