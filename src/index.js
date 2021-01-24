require('./config');
require('./model');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const helmet = require('helmet');
const moment = require('moment-timezone');

// utils
const { ApiResponse } = require('./util/api');
const { globalErrorHandler } = require('./util/error');
const logger = require('./log');

// middlewares
const httpLogger = require('./middleware/httpLogger');
const jwt = require('./middleware/jwt');

// routes
const { authRouter } = require('./router/auth.router');
const { userRouter } = require('./router/user.router');
const roleRouter = require('./router/role.router');

// constants
const authRoutes = require('./constant/route/auth.route.constant');
const swaggerRoutes = require('./constant/route/swagger.route.constant');

const app = express();
moment.tz.setDefault('Asia/Colombo');

// common middlewares
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt);
app.use(httpLogger);

// root route
app.all('/', (req, res) => res.send(new ApiResponse({}, 'API has started and working')));

const swaggerYAML = YAML.load(`${__dirname}/util/swagger.yaml`);
app.use(swaggerRoutes.ROOT, swaggerUi.serve, swaggerUi.setup(swaggerYAML));

// routes
app.use(authRoutes.ROOT, authRouter);
app.use('/users', userRouter);
app.use('/roles', roleRouter);

// handle global errors
app.use(globalErrorHandler);

// START THE SERVER
const port = process.env.SERVER_PORT;
const apiEnv = process.env.API_ENV;
const server = process.env.SERVER_NAME;
app.listen(+port, () => {
  logger.info(`${server} started with port:${port} in ${apiEnv} environment`);
});
