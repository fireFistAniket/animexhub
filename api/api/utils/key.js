"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ZoroKey {
    getKey = async (fastify, options) => {
        fastify.get('/key/:keyID', async (request, reply) => {
            const keyID = parseInt(request.params.keyID);
            if (keyID !== 4 && keyID !== 6)
                return reply.status(400).send({ message: 'keyID can either be 4 or 6.' });
            try {
                const { data } = await axios_1.default.get(`http://9anime.to/key/e${keyID}.txt`);
                reply.status(200).send(data);
            }
            catch (err) {
                reply
                    .status(500)
                    .send({ message: 'Something went wrong. Contact developer for help.' });
            }
        });
    };
}
exports.default = ZoroKey;
