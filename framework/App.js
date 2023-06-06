const http = require('http')
const EventEmitter = require('events')

/*
  endpoint = {
    '/users': {
      'GET': handler
    }
  }
*/

class App {
  constructor() {
    this.emitter = new EventEmitter()
    this.server = this.#createServer()
    this.middlewares = []
  }

  listen(post, callback) {
    this.server.listen(post, callback)
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path]
      Object.keys(endpoint).forEach(method => {
        this.emitter.on(this.#getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method]
          handler(req, res)
        })
      })
    })
  }

  #createServer() {
    return http.createServer((req, res) => {
      let body = ''

      req.on('data', (chunk) => {
        body += chunk
      })

      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body)
        }

        this.middlewares.forEach(middleware => middleware(req, res))
        // console.log(req.pathname)
        const emitted = this.emitter.emit(this.#getRouteMask(req.pathname, req.method), req, res)
        if (!emitted) {
          res.end()
        }
      })
    })
  }

  #getRouteMask(path, method) {
    return `[${path}]:[${method}]`
  }
}

module.exports = App