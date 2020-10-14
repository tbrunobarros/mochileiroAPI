const {
  OPEN_WEATHER_MAP_URL_BASE,
  OPEN_WEATHER_MAP_URL_KEY_APP,
} = require('./../config')

const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const axios = require('axios')
const Boom = require('boom')
const failAction = (request, h, err) => {
  throw err
}

class ClimaRoute extends BaseRoute {
  constructor() {
    super()
  }

  list() {
    const schema = {
      cidade: Joi.string().max(80).required(),
    }

    return {
      path: '/obter-clima',
      method: 'GET',
      config: {
        tags: ['api', 'clima'],
        description: 'Listagem do clima por cidade',
        notes: 'Consulta o clima de acordo com a cidade informada',
        validate: {
          failAction,
          query: schema,
        },
      },
      handler: async (request, headers) => {
        try {
          const { cidade } = request.query

          const result = await axios.get(
            `${OPEN_WEATHER_MAP_URL_BASE}/weather?q=${cidade}&appid=${OPEN_WEATHER_MAP_URL_KEY_APP}&units=metric&lang=pt_br`
          )
          .catch(error => {                                                 
            if(error){
              return error;
            }            
            return { response: { data: { message: 'Não foi possivel obter o clima'} }}
          })

          if(result.response){
            return result.response.data
          }          
          
          const clima = result.data
          return {
            cidade: clima.name,
            temperatura: clima.main.temp,
            temperatura_minima: clima.main.temp_min,
            temperatura_maxima: clima.main.temp_max,
            umidade: clima.main.humidity,
            sensacao_termica: clima.main.feels_like,
            velocidade_vento: clima.wind.speed,
            clima: clima.weather,
          }
          
        } catch (error) {
          console.log('deu erro no clima', error)
        }
      }
    }
  }
}

module.exports = ClimaRoute
