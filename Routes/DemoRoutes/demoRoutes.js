const Controller = require('../../Controllers');
const Joi = require('@hapi/joi');
const Config = require('../../Configuration/appConstants');

var demoApi = {
  method: 'GET',
  path: '/demo/api/{name}',
  options: {
    description: 'Demo API',
    tags: ['api', 'demo'],
    validate: {
      params: Joi.object({
        name: Joi.string().required(),
      }),
    },
    handler: async function (request, h) {
      return await Controller.DemoBaseController.demoFunction(
        request.params,
        function (err, data) {
          if (err) Config.STATUS_MSG.ERROR.DEFAULT;
          else {
            return {
              ...Config.STATUS_MSG.SUCCESS.DEFAULT,
              data: data,
            };
          }
        }
      );
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: Config.swaggerDefaultResponseMessages,
      },
    },
  },
};

var DemoBaseRoute = [demoApi];
module.exports = DemoBaseRoute;
