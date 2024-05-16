"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ImageProxy {
    async getImageProxy(fastify, options) {
        const getImage = async (url, options) => {
            const data = await axios_1.default
                .get(url, {
                responseType: 'arraybuffer',
                ...options,
            })
                .catch((err) => {
                return { data: err.response.data };
            });
            return data.data;
        };
        fastify.get('/image-proxy', async (request, reply) => {
            const { url } = request.query;
            // get headers from the query
            const { headers } = request.query;
            if (!url || !headers) {
                reply.status(400).send('No URL provided');
                return;
            }
            // return the image
            reply.header('Content-Type', 'image/jpeg');
            reply.header('Cache-Control', 'public, max-age=31536000');
            reply.header('Access-Control-Allow-Origin', '*');
            reply.header('Access-Control-Allow-Methods', 'GET');
            reply.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            reply.header('Access-Control-Allow-Credentials', 'true');
            reply.send(await getImage(url, { headers: JSON.parse(headers) }));
        });
    }
}
exports.default = ImageProxy;
