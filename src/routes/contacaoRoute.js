const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const failAction = (request, h, err) => {
  throw err
};



class CotacaoRoute extends BaseRoute {
  constructor() {
    super()
  }

  list() {
    const schema = {
      moeda: Joi.string().max(2).default('BR'),
    };

    return {
      path: '/obter-cotacoes',
      method: 'GET',
      config: {        
        tags: ['api'],
        description: 'Listagem de cotações',
        notes: 'Consulta uma lista de cotações de acordo com a moeda',
        validate: {
          failAction,          
          query: schema,
        },
      },
      handler: async (request, headers) => {
        const params = request.query
        return params        
      },
    };
  }
}

module.exports = CotacaoRoute
