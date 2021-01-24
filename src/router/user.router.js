const express = require('express');
// const { body } = require('express-validator');
// const userController = require('../controller/user.controller');
// const { validate } = require('../middleware/validate');
// const { ForbiddenException } = require('../util/error');
// const multer = require('../middleware/multer');

const userRouter = express.Router();
//
// const userIdValidator = [
//   body('userId').notEmpty().withMessage('userId is required'),
//   body('userId').isMongoId().withMessage('userId should be a mongo ID'),
// ];
//
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
// const digimedAdminValidator = (req, res, next) => {
//   const {
//     user: { roles },
//   } = req;
//
//   if (!roles.some(r => r.code === process.env.DIGI_MED_ADMIN_ROLE_CODE)) {
//     return next(new ForbiddenException('admin role is required to access this resource'));
//   }
//   next();
// };
//
// userRouter.get('/', adminValidator, userController.findAll);
// userRouter.post('/login-methods', adminValidator, userController.loginMethods);
// userRouter.get('/supervisors', adminValidator, userController.supervisors);
// userRouter.get('/profile', userController.getUserById);
// userRouter.post('/digimed/update', digimedAdminValidator, userController.digimedUserUpdate);
// userRouter.post('/digimed/import', digimedAdminValidator, userController.digimedUserImport);
// userRouter.post('/digimed/getDeviceToken', digimedAdminValidator, userController.getDeviceTokenByDigimedCode);
// userRouter.get('/sync', adminValidator, userController.syncWithAD);
// userRouter.put('/', adminValidator, userIdValidator, validate, userController.update);
// userRouter.put('/switch-active-state', adminValidator, userIdValidator, validate, userController.switchActiveState);
// userRouter.put('/switch-digimed-state', adminValidator, userIdValidator, validate, userController.switchDigimedState);
// userRouter.put('/switch-digiex-state', adminValidator, userIdValidator, validate, userController.switchDigiExState);
// userRouter.put('/switch-lock-state', adminValidator, userIdValidator, validate, userController.switchLockState);
// userRouter.get('/user-hierarchy', adminValidator, userController.getUserHierarchy);
// userRouter.put('/user-hierarchy', adminValidator, userController.updateUserHierarchy);
// userRouter.get('/user-hierarchy/new-users', adminValidator, userController.getNewUsersForHierarchy);
// userRouter.post(
//   '/remove-payment-requests',
//   multer.single('file'),
//   adminValidator,
//   paymentRequestController.removePaymentRequests
// );
// userRouter.post('/view-payment-requests', adminValidator, paymentRequestController.viewPaymentRequests);

module.exports = {
  userRouter,
};
