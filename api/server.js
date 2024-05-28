// Ver https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Agrega esto antes de server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/producto/:recurso/:id/ver': '/:recurso/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('El servidor JSON está funcionando')
})

// Exporta la API del Servidor
module.exports = server