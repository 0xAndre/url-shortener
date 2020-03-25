'use strict'

const SERVER_PORT = process.env.PORT || 5000

const fastify = require('fastify')
const path = require('path')
const shortenerService = require('./services/shortenerService')

const app = fastify()

app.register(require('point-of-view'), {
    engine: {
        handlebars: require('handlebars')
    }
})

app.register(require('fastify-static'), {
    root: path.join(__dirname, 'public')
})

app.get('/', async (req, reply) => {
    reply.view('./views/index.hbs')
})

app.post('/short', async (req, reply) => {
    let { url } = req.body
    let short = shortenerService.SaveShortUrl(url)
    reply.send(short)
})

app.get('/:short', async (req, reply) => {
    let { short } = req.params
    let url = shortenerService.GetMainUrl(short)
    
    if (url) {
        reply.redirect(url)
    } else {
        reply.redirect('/')
    }
})



app.listen(SERVER_PORT).then(() => {
    console.log('Server Running...')
})
