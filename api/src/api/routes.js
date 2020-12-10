module.exports = (app) =>{
  app.use('/',require('./main'))
  app.use('/financial',require('./financial'))
}