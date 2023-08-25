import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

// create Management route
router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementToDb
);

// get single management
router.get('/:id', ManagementDepartmentController.getSingleManagement);

// delete management
router.delete('/:id', ManagementDepartmentController.deleteManagement);

// update management
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagement
);

// get all management
router.get('/', ManagementDepartmentController.getAllManagement);

export const ManagementRoutes = router;
