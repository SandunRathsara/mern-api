const { createECDH } = require('crypto');
const { ApiResponse } = require('../util/api');
const { CryptoKey, User } = require('../model');
const jwt = require('jsonwebtoken');

const keygen = async (req, res) => {
  try {
    const dashPubKey = req.body.publicKey;
    const keyObj = {};
    if (req.headers.authorization) {
      try {
        const tokenData = jwt.verify(req.headers.authorization.split(' ')[1], process.env.LOGIN_SECRET);
        const user = await User.findOne({ email: tokenData.email });
        keyObj['userId'] = user._id;
        // await CryptoKey.deleteMany({
        //   $or: [{ userId: user._id }, { userId: null }],
        //   publicKey: { $ne: req.dashPubKey },
        // });
      } catch (error) {
        // logger.info(`Crypto Key Generation Token Issue | Error: ${error.message}`);
      }
    }

    const api = createECDH('secp256k1');
    api.generateKeys();

    const apiPubKey = api.getPublicKey().toString('base64');
    const apiSecret = api.computeSecret(dashPubKey, 'base64', 'hex');

    keyObj['publicKey'] = dashPubKey;
    keyObj['secretKey'] = apiSecret;

    const key = new CryptoKey(keyObj);

    key.save();

    // const enc = new e2e(apiSecret);
    // const payload = JSON.stringify({ email: 'sandun@insureme.lk', password: 'admin123' });
    // const encPayload = enc.encrypt(payload);
    // console.log(`Encryption: ${encPayload}\nDashpublicKey: ${dashPubKey}\napiPubKey: ${apiPubKey}`);

    return res.send(new ApiResponse(apiPubKey));
  } catch (error) {
    console.log('error', error.message);
    //logger.error(`Key generation Failure | ${error.message}`);
  }
};

module.exports = { keygen };
