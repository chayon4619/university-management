import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

// get single admin
router.get('/:id', AdminController.getSingleAdmin);

// get all admin
router.get('/', AdminController.getAllAdmin);

// delete admin
router.delete('/:id', AdminController.deleteAdmin);

// update admin
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodValidation),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
