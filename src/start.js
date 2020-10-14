const { PORT } = require('./config')

const Hapi = require('hapi')
const MapRoute = require('./routes/mapRoute')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const app = new Hapi.Server({
  port: PORT,
})

async function start() {
  const swaggerOption = {
    info: {
      title: 'API do Mochileiro',
      version: 'v1.0',
    },
    grouping: 'tags',
    lang: 'pt',
  }

  await app.register([    
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOption,
    },
  ])
    

  app.route(MapRoute())

  await app.start()
  console.log(`Servidor rodando na porta ${app.info.port}`)

  return app
}

module.exports = start()
