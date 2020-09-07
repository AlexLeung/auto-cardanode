import fastifyFactory from 'fastify';
import * as ansicolor from 'ansicolor';
import * as fs from 'fs';
import * as path from 'path';
import { port } from './constants';
import { rpcHandler } from './rpc';

const fastify = fastifyFactory({
    logger: false
});

fastify.get('/script.js', (req, res) => {
    res
        .type('application/javascript')
        .send(fs.createReadStream(path.resolve(__dirname, 'front-end/main.js')));
});

fastify.get('*', (req, res) => {
    res
    .type('text/html')
    .send(`
    <html>
        <head>
            <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
            <style>
                body, html {
                    padding: 0;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <div id="app">hello world</div>
            <script src="/script.js"></script>
        </body>
    </html>
    `)
});

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
        const json = JSON.parse(body as string);
        done(null, json);
    } catch (err) {
        err.statusCode = 500;
        done(err, undefined);
    }
});

fastify.post('/rpc', async (req, res) => {
    const requestObj = req.body as { requestType: any, payload: any };
    try {
        const responseObj = {
            payload: JSON.stringify(await (rpcHandler as any)[requestObj.requestType](requestObj.payload))
        };
        res
            .type('application/json')
            .send(responseObj);
    } catch (err) {
        res
            .type('application/json')
            .status(500)
            .send(JSON.stringify({error: err}));
    }
})

fastify.listen(port, '0.0.0.0');

console.log(`Navigate to ${ansicolor.lightBlue(`http://localhost:${port}`)} to view application`);