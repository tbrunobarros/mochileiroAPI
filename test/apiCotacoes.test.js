const assert = require("assert");
const api = require("./../src/start");
let start = {};

describe("API Cotações tests", function () {
  this.beforeAll(async () => {
    start = await api;
  })
  it('Deve listar códigos moedas', async () => {
    const result = await start.inject({
        method: 'GET',
        url: '/obter-codigos-moedas', 
    })
    const statusCode = result.statusCode

    assert.deepStrictEqual(statusCode, 200)
    assert.ok(Array.isArray(JSON.parse(result.payload)))
  })
  it('Deve listar cotações de moedas', async () => {
    const result = await start.inject({
        method: 'GET',
        url: '/obter-cotacoes', 
    })    
    const statusCode = result.statusCode
    assert.deepStrictEqual(statusCode, 200)    
  })
  it('Não deve buscar a cotação sem definir uma moeda', async () => {
    const result = await start.inject({
        method: 'POST',
        url: '/obter-cotacoes-moeda', 
        payload: {
            
        }
    })    
    const payload = JSON.parse(result.payload)
    assert.deepStrictEqual(result.statusCode, 400)    
    assert.ok(payload.message.search('"moeda\" is required') !== -1)
  })
  it('Não deve buscar a cotação com código de moeda invalido', async () => {
    const result = await start.inject({
        method: 'POST',
        url: '/obter-cotacoes-moeda', 
        payload: {
            moeda: 'teste'
        }
    })    
    const payload = JSON.parse(result.payload)    
    assert.deepStrictEqual(result.statusCode, 400)    
    assert.ok(payload.message.search('"moeda\" must be one of') !== -1)
    
  })
})
