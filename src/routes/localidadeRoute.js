const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const axios = require('axios')
const {IBGE_URL_BASE} = require('./../config')

const failAction = (request, h, err) => {
  throw err
};

class LocalidadeRoute extends BaseRoute {
  constructor() {
    super()
  }

  obterEstados() {    
    return {
      path: '/obter-estados',
      method: 'GET',
      config: {        
        tags: ['api'],
        description: 'Listagem de estados',
        notes: 'Consulta uma lista de estados',
        validate: {
          failAction,           
        },
      },
      handler: async (request, headers) => {
        try {
          const estados = await axios.get(` ${IBGE_URL_BASE}/v1/localidades/estados`)
          return estados.data.map((estado) => {
            return {
              id: estado.id,
              sigla: estado.sigla,
              nome: estado.nome
            }
          })
        }
        catch(error){
          console.log('deu error', error)
        }                
      },
    };
  }

  obterEstadoPorId() {        
    
    return {
      path: '/obter-estados/{id}',
      method: 'GET',
      config: {        
        tags: ['api'],
        description: 'Obter um estado',
        notes: 'Consulta um estado',
        validate: {
          failAction,
          params: {
            id: Joi.number().required()
        },
        },
      },
      handler: async (request, headers) => {
        try {
          const { id } = request.params
          const estado = (await axios.get(` ${IBGE_URL_BASE}/v1/localidades/estados/${id}`)).data
          return {
            id: estado.id,
            sigla: estado.sigla,
            nome: estado.nome
          }                      
        }
        catch(error){
          console.log('deu error', error)
        }                
      },
    };
  }

  obterCidadesPorEstado() {
    const schema = {
      UF: Joi.string().min(2).max(2).required().default('SE'),
    };

    return {
      path: '/obter-cidades',
      method: 'GET',
      config: {        
        tags: ['api'],
        description: 'Listagem de cidades por estado',
        notes: 'Consulta uma lista de cidade por estado',
        validate: {
          failAction,
          query: schema,        
        },
      },
      handler: async (request, headers) => {
        try {
          const {UF} = request.query          
          const cidades = await axios.get(` ${IBGE_URL_BASE}/v1/localidades/estados/${UF}/municipios`)
          return cidades.data.map((cidade) => {
            return {   
              id: cidade.id,         
              nome: cidade.nome
            }
          })
        }
        catch(error){
          console.log('deu error', error)
        }                
      },
    };
  }


}

module.exports = LocalidadeRoute
