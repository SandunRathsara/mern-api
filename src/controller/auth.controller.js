const { InternalServerErrorException, BusinessLogicFailureException } = require('../util/error');
const { ApiResponse } = require('../util/api');
const { User } = require('../model');
const { UserResponse } = require('../model/dto');
const logger = require('../log');
const { formatMobileNumber } = require('../helpers/general.helper');
const { Exception, UnauthorizedException } = require('../util/error');
const passport = require('passport');
const { passportStrategies } = require('../constant/general.constant');

/**
 * User Registration
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.register = async (req, res, next) => {
  try {
    const mobile = formatMobileNumber(req.body.mobile);
    if (!mobile) return next(new BusinessLogicFailureException('Mobile number invalid'));
    const { email, fname, lname, password } = req.body;
    const user = new User({
      email,
      mobile,
      fname,
      lname,
      password,
    });

    await user.save();
    logger.info(`User created for email: ${email}`);

    return res.send(new ApiResponse({ user: new UserResponse(user) }));
  } catch (e) {
    if (e instanceof Exception) return next(e);
    else return next(new InternalServerErrorException(e.message));
  }
};

/**
 * User Login
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.login = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    // noinspection JSUnusedLocalSymbols
    passport.authenticate(passportStrategies.LOGIN, async (err, user, info) => {
      if (err || !user) return next(new UnauthorizedException('Authorization Failure'));

      req.login(user, { session: false }, async error => {
        if (error) return next(new UnauthorizedException(error.message));
        const token = user.generateToken();

        logger.info(`User: ${user.email} login successful`);
        return res.send(new ApiResponse({ user: new UserResponse(user), token }));
      });
    });
  } catch (e) {
    if (e instanceof Exception) return next(e);
    else return next(new InternalServerErrorException(e.message));
  }
};
