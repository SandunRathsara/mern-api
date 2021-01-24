const { info } = require('../log');
// const { authRoutes } = require('../router/auth.router');

const httpLogger = (req, res, next) => {
  // let body;
  // if (authRoutes.includes(req.url)) {
  //   body = '***';
  // } else {
  //   body = JSON.stringify(removeSensitives(req.body), null, '\t');
  // }
  const body = JSON.stringify(removeSensitives(req.body), null, '\t');

  const message = `
      ${req.method} --> ${req.url} | 
      Path Params: ${JSON.stringify(req.params)} | 
      Query Params: ${JSON.stringify(req.query)} |
      User: ${JSON.stringify(req.user)} |
      Body: ${body}`;
  info(message);
  next();
};

const sensitiveFields = ['mobileNumber'];

function removeSensitives(body) {
  const logObj = {};
  for (const key in body) {
    if (sensitiveFields.includes(key)) logObj[key] = '***';
    else logObj[key] = body[key];
    if (typeof body[key] === 'object') {
      logObj[key] = removeSensitives(body[key]);
    }
  }
  return logObj;
}

module.exports = httpLogger;
