"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = async (fastify, options) => {
    //await fastify.register(getcomics, { prefix: '/getcomics' });
    fastify.get('/', async (request, reply) => {
        reply.status(200).send('Welcome to Consumet Comics 🦸‍♂️');
    });
    fastify.get('/s', async (request, reply) => {
        const { comicTitle, page } = request.query;
        reply.status(300).redirect(`getcomics/s?comicTitle=${comicTitle}&page=${page}`);
    });
};
exports.default = routes;
