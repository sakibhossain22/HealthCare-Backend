import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionValidation } from './prescription.validation';
import { checkAuth } from '../../middleware/checkAuths';
import { UserRole } from '../../../generated/prisma/enums';

const router = express.Router();

router.get(
    '/',
    checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    PrescriptionController.getAllPrescriptions
);

router.get(
    '/my-prescriptions',
    checkAuth(UserRole.PATIENT, UserRole.DOCTOR),
    PrescriptionController.myPrescriptions
)

router.post(
    '/',
    checkAuth(UserRole.DOCTOR),
    validateRequest(PrescriptionValidation.createPrescriptionZodSchema),
    PrescriptionController.givePrescription
)

router.patch(
    '/:id',
    checkAuth(UserRole.DOCTOR),
    validateRequest(PrescriptionValidation.updatePrescriptionZodSchema),
    PrescriptionController.updatePrescription
)

router.delete(
    '/:id',
    checkAuth(UserRole.DOCTOR),
    PrescriptionController.deletePrescription
)


export const PrescriptionRoutes = router;