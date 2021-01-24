const { e2e } = require('./cryptor');
const _ = require('lodash');
const { CryptoKey } = require('../model');
const { ApiResponse } = require('../util/api');
const { BadRequestException, ExternalServerErrorException, DatabaseException } = require('../util/error');

const PUBLIC_KEY_ROUTES = [
  '/auth/login/plain',
  '/auth/dashboard/login/plain',
  '/mobile/auth/login/plain',
  '/mobile/auth/otp/request',
  '/mobile/auth/otp/verify',
  '/mobile/auth/otp/resend',
];

const decryptRequest = async (req, res, next) => {
  try {
    if (req.method === 'POST' && req.headers.masking !== undefined && req.headers.masking === process.env.MASKING_KEY) {
      return next();
    }
    if (req.method === 'GET') {
      return next();
    }

    let keyRec;
    if (_.includes(PUBLIC_KEY_ROUTES, req.originalUrl)) {
      keyRec = await CryptoKey.findOne({ publicKey: req.body.publicKey });
      req.crypto = req.body;
    } else {
      keyRec = await CryptoKey.findOne({ userId: req.user._id });
    }

    const key = keyRec.secretKey;
    if (!key) throw Error('Key not found');

    const dec = new e2e(key);
    const payload = dec.decrypt(req.body.payload);
    req.body = JSON.parse(payload);
    if (_.includes(PUBLIC_KEY_ROUTES, req.originalUrl)) {
      req.body = { ...req.body, publicKey: keyRec.publicKey };
    }
    next();
  } catch (error) {
    return res.status(210).send(new ApiResponse('Request Decryption Failure', 'ERROR'));
  }
};

const encryptResponse = async (req, res, next) => {
  try {
    if (res.error) throw res.error;
    let keyRec;
    if (_.includes(PUBLIC_KEY_ROUTES, req.originalUrl)) {
      keyRec = await CryptoKey.findOne({ publicKey: req.body.publicKey });
    } else {
      keyRec = await CryptoKey.findOne({ userId: req.user._id });
    }
    const enc = new e2e(keyRec.secretKey);
    if (res.data.data) {
      res.data.data = enc.encrypt(JSON.stringify(res.data.data));
    }
    return res.status(200).send(res.data);
  } catch (error) {
    //  return res.status(error.statusCode).send(error);
    // console.log('error', typeof error);
    // if (
    //   Object === ApiResponse ||
    //   Exception instanceof BadRequestException ||
    //   Exception instanceof ExternalServerErrorException ||
    //   Exception instanceof DatabaseException ||
    //   Exception instanceof InternalServerErrorException
    // ) {
    //   return res.status(400).send(error);
    //   //return res.send(new ApiResponse(error.message, 'error'));
    // }
    //return res.status(error.statusCode).send(error);
    return res.status(400).send(new ApiResponse({}, error.message, 'BadRequest', 400));
  }
};

const notEncryptedResponse = async (req, res) => {
  try {
    if (res.error) throw res.error;

    return res.status(200).send(res.data);
  } catch (error) {
    if (
      error instanceof BadRequestException ||
      error instanceof ExternalServerErrorException ||
      error instanceof DatabaseException
    ) {
      return res.send(new ApiResponse(error.message, 'ERROR'));
    }
    return res.send(new ApiResponse('Something went wrong', 'ERROR'));
  }
};

module.exports = { decryptRequest, encryptResponse, notEncryptedResponse };
