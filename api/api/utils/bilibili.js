"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class BilibiliUtilis {
    locale;
    apiUrl = 'https://api.bilibili.tv/intl/gateway/web';
    sgProxy = 'https://cors.proxy.consumet.org';
    constructor(locale = 'en_US') {
        this.locale = locale;
    }
    returnDASH = async (fastify, options) => {
        fastify.get('/bilibili/playurl', async (request, reply) => {
            const episodeId = request.query.episode_id;
            if (typeof episodeId === 'undefined')
                return reply.status(400).send({ message: 'episodeId is required' });
            try {
                // const ss = await axios.get(
                //   `${this.sgProxy}/${this.apiUrl}/playurl?s_locale=${this.locale}&platform=web&ep_id=${episodeId}`,
                //   { headers: { cookie: String(process.env.BILIBILI_COOKIE) } }
                // );
                const ss = await axios_1.default.get(`https://kaguya.app/server/source?episode_id=${episodeId}&source_media_id=1&source_id=bilibili`, { headers: { cookie: String(process.env.BILIBILI_COOKIE) } });
                //kaguya.app/server/source?episode_id=11560397&source_media_id=1&source_id=bilibili
                //console.log(ss.data);
                if (!ss.data.sources)
                    return reply.status(404).send({ message: 'No sources found' });
                const dash = await axios_1.default.get(ss.data.sources[0].file);
                //const dash = new BilibiliExtractor().toDash(ss.data.data.playurl);
                return reply.status(200).send(dash.data);
            }
            catch (err) {
                console.log(err);
                reply
                    .status(500)
                    .send({ message: 'Something went wrong. Contact developer for help.' });
            }
        });
    };
    returnVTT = async (fastify, options) => {
        fastify.get('/bilibili/subtitle', async (request, reply) => {
            const url = request.query.url;
            try {
                const jsonVtt = await axios_1.default.get(url);
                const vtt = new VTT();
                jsonVtt.data.body.map((subtitle) => {
                    vtt.add(subtitle.from, subtitle.to, subtitle.content);
                });
                reply.status(200).send(vtt.toString());
            }
            catch (err) {
                reply
                    .status(500)
                    .send({ message: 'Something went wrong. Contact developer for help.' });
            }
        });
    };
}
class VTT {
    counter = 0;
    content = 'WEBVTT\r\n';
    pad = (num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    };
    secondsToTime = (sec) => {
        if (typeof sec !== 'number') {
            throw new Error('Invalid type: expected number');
        }
        var seconds = (sec % 60).toFixed(3);
        var minutes = Math.floor(sec / 60) % 60;
        var hours = Math.floor(sec / 60 / 60);
        return this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(seconds);
    };
    add = (from, to, lines, settings) => {
        ++this.counter;
        lines = lines.constructor === Array ? lines : [lines];
        this.content +=
            '\r\n' +
                this.counter +
                '\r\n' +
                this.secondsToTime(from) +
                ' --> ' +
                this.secondsToTime(to) +
                (settings ? ' ' + settings : '') +
                '\r\n';
        lines.forEach((line) => {
            this.content += line + '\r\n';
        });
    };
    toString = () => {
        return this.content;
    };
}
exports.default = BilibiliUtilis;
