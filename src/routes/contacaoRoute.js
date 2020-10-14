const {AWESOMEAPI_URL_BASE } = require('./../config')
const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const axios = require('axios')
const moedas = require('./../helpers/moedasHelpers')
const failAction = (request, h, err) => {
  throw err
};
class CotacaoRoute extends BaseRoute {
  constructor() {
    super()
  }

  cotacoes() {    
    return {
      path: '/obter-cotacoes',
      method: 'GET',
      config: {        
        tags: ['api', 'cotações'],
        description: 'Listagem de cotações',
        notes: 'Consulta uma lista de cotações das principais moedas',
        validate: {
          failAction          
        },
      },
      handler: async (request, headers) => {
        const result = await axios.get(
          `${AWESOMEAPI_URL_BASE}/json/all`)

          return result.data
      },
    }
  }

  cotacaoMoeda() {    
    return {
      path: '/obter-cotacoes-moeda',
      method: 'POST',
      config: {        
        tags: ['api', 'cotações'],
        description: 'Listagem de cotações por moeda',
        notes: 'Consulta uma lista de cotações das principais moedas',
        validate: {
          failAction,
          payload: {
            moeda: Joi.string().required().max(8).valid(moedas.codigos),
            dias: Joi.number().max(360).optional().default(5)
          }
        },
      },
      handler: async (request, headers) => {
        const body = request.payload

        const result = await axios.get(
          `${AWESOMEAPI_URL_BASE}/json/daily/${body.moeda}/${body.dias}`)

          return result.data
      },
    }
  }
  
  codigocotacaoMoeda() {    
    return {
      path: '/obter-codigos-moedas',
      method: 'GET',
      config: {        
        tags: ['api', 'cotações'],
        description: 'Listagem dos códigos das moedas',
        notes: 'Consulta uma lista de cotações das principais moedas',
        validate: {
          failAction,          
        },
      },
      handler: async (request, headers) => {        
          return moedas.codigosDescricao
      },
    }
  }

}

module.exports = CotacaoRoute
