import fastifyFactory from 'fastify';
import * as ansicolor from 'ansicolor';
import * as fs from 'fs';
import * as path from 'path';
import { port, serverInstance } from './constants';
import { rpcHandler } from './rpc';

const fastify = fastifyFactory({
    logger: false
});

fastify.get('/script.js', (req, res) => {
    res
        .type('application/javascript')
        .send(fs.createReadStream(path.resolve(__dirname, 'front-end/spa.js')));
});

fastify.get('*', (req, res) => {
    res
    .type('text/html')
    .send(`
    <html>
        <head>
            <style>
            body, html {
                padding: 0;
                margin: 0;
            }
            </style>
        </head>
        <body>
            <div id="app">hello world</div>
            <script>
                window.serverInstance = '${serverInstance}';
            </script>
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
        const responseObj = await rpcHandler.request(requestObj.requestType, requestObj.payload);
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

fastify.listen(port);

console.log(`Navigate to ${ansicolor.lightBlue(`http://localhost:${port}`)} to view application`);