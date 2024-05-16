"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
class Providers {
    getProviders = async (fastify, options) => {
        fastify.get('/providers', {
            preValidation: (request, reply, done) => {
                const { type } = request.query;
                const providerTypes = Object.keys(extensions_1.PROVIDERS_LIST).map((element) => element);
                if (type === undefined) {
                    reply.status(400);
                    done(new Error('Type must not be empty. Available types: ' + providerTypes.toString()));
                }
                if (!providerTypes.includes(type)) {
                    reply.status(400);
                    done(new Error('Type must be either: ' + providerTypes.toString()));
                }
                done(undefined);
            },
        }, async (request, reply) => {
            const { type } = request.query;
            const providers = Object.values(extensions_1.PROVIDERS_LIST[type]).sort((one, two) => one.name.localeCompare(two.name));
            reply.status(200).send(providers.map((element) => element.toString));
        });
    };
}
exports.default = Providers;
