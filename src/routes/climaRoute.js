const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const axios = require('axios')
const failAction = (request, h, err) => {
  throw err
};



class ClimaRoute extends BaseRoute {
  constructor() {
    super()
  }
  
  list() {        
    const schema = {
      cidade: Joi.string().max(80).required(),
    };

    return {
      path: '/obter-clima',
      method: 'GET',
      config: {        
        tags: ['api'],
        description: 'Listagem do clima da cidade',
        notes: 'Consulta o clima de acordo com a cidade',
        validate: {
          failAction,          
          query: schema,
        },
      },
      handler: async (request, headers) => {
        try {            
            const {cidade} = request.query
            const appidKey = '6a61c95e792b99ae9d6862ed5465f055'
            const clima = (await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${appidKey}&units=metric&lang=pt_br`)).data
            
            return {
                cidade: clima.name,
                temperatura: clima.main.temp,
                temperatura_minima: clima.main.temp_min,
                temperatura_maxima: clima.main.temp_max,
                umidade: clima.main.humidity,
                sensacao_termica: clima.main.feels_like,
                velocidade_vento: clima.wind.speed,
                clima: clima.weather
            } 
            
          }
          catch(error){
            console.log('deu erro no clima', error)
          }

      },
    };
  }
}

module.exports = ClimaRoute
