const express = require('express');
const bootstrap = require('./bootstrap');
const passport = require('./passport');
const auth = require('./middleware/auth');
const {routes} = require('./routes');
const notFoundHandler = require('./middleware/not-found-handler');
const errorHandler = require('./middleware/error-handler.js');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const {PORT = 3000, NODE_ENV} = process.env;

const app = express();
bootstrap();

// prettier-ignore
app
  .use(express.json())
  .use(cors())
  .use(fileUpload())
  .use(express.static('public'))
  .use(passport.initialize())
  .use(auth())
  .use('/api', routes)
  .use(notFoundHandler)
  .use(errorHandler)
  .listen(PORT, console.log(`Server has been started in ${NODE_ENV} mode at port ${PORT}`));
