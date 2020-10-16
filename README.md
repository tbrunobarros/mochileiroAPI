# MochileiroAPI
Projeto de aprendizagem do node.js com o objetivo de fornecer serviços de informações das cidades, clima e cotações da moeda para geração de uma dashboard de acompanhamento dos mochileiro e viajantes.

## Requisitos

* Uma versão do Node.js pelo menos 10 ou superior ([instruções de instalação / atualização](https://github.com/nodesource/distributions))
* Obter uma **KEY APP** da [Open Weather API](https://openweathermap.org/api)

## Instalação

1. Restaurar os pacotes e dependências do npm seguindo o comando `npm install`
2. Configurar as variaves de ambiente necessárias no projeto

```
PORT=5002
IBGE_URL_BASE=https://servicodados.ibge.gov.br/api
OPEN_WEATHER_MAP_URL_BASE=https://api.openweathermap.org/data/2.5
OPEN_WEATHER_MAP_URL_KEY_APP=6a61c95e792b99ae9d6862ed5465f055
AWESOMEAPI_URL_BASE=https://economia.awesomeapi.com.br
```
## Rodando o MochileiroAPI

Para rodar a aplicação basta executar o comando: `npm run start`

## Rodando os Testes

1. Para rodar os testes é necessário instalar o mocha no contexto global `npm install mocha -g`
2. Execute o comando no seu terminal de : `npm run test`

## Visualizando a documentação da API

Para visualizar o swagger da aplicação é necessário rodar a API e acessar a rota: [http://localhost:porta/](http://localhost:<porta>/)

## Publicação

Segue a publicação da API em um servidor no heroku [mochileiroAPI](https://mochileiro.herokuapp.com)

