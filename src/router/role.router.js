const express = require('express');
// const roleController = require('../controller/role.controller');
// const { ForbiddenException } = require('../util/error');
// const { validate } = require('../middleware/validate');

const router = express.Router();

// const adminValidator = (req, res, next) => {
//   const {
//     user: { roles },
//   } = req;
//
//   if (!roles.some(r => r.code === process.env.ADMIN_ROLE_CODE)) {
//     return next(new ForbiddenException('admin role is required to access this resource'));
//   }
//   next();
// };

// router.get('/', adminValidator, validate, roleController.findAll);

module.exports = router;
