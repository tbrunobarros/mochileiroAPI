const CotacaoRoute = require('./contacaoRoute')
const LocalidadeRoute = require('./localidadeRoute')
const ClimaRoute = require('./climaRoute')

function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

module.exports = function () {
  return [
      ...mapRoutes(new CotacaoRoute(), CotacaoRoute.methods()),
      ...mapRoutes(new LocalidadeRoute(), LocalidadeRoute.methods()),
      ...mapRoutes(new ClimaRoute(), ClimaRoute.methods())
    ];
};
