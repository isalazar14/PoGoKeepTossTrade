const controller = require('../controllers/controller')

module.exports = (app) => {
  app.post('/api/csvUpload', controller.csvUpload);
  app.get('/api/forkStages', controller.getFamilyForkStages);
  app.get('/api/test', controller.test);
  app.get('/getFile', controller.getFile)
}