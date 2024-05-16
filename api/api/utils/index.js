"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bilibili_1 = __importDefault(require("./bilibili"));
const image_proxy_1 = __importDefault(require("./image-proxy"));
const m3u8_proxy_1 = __importDefault(require("./m3u8-proxy"));
const providers_1 = __importDefault(require("./providers"));
const key_1 = __importDefault(require("./key"));
const routes = async (fastify, options) => {
    //await fastify.register(new RapidCloud().returnSID);
    await fastify.register(new bilibili_1.default('en_US').returnDASH);
    await fastify.register(new bilibili_1.default('en_US').returnVTT);
    await fastify.register(new image_proxy_1.default().getImageProxy);
    await fastify.register(new m3u8_proxy_1.default().getM3U8Proxy);
    await fastify.register(new providers_1.default().getProviders);
    await fastify.register(new key_1.default().getKey);
    fastify.get('/', async (request, reply) => {
        reply.status(200).send('Welcome to Consumet Utils!');
    });
};
exports.default = routes;
