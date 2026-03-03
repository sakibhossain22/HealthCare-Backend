import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest";
import { PatientController } from "./patient.controller";
import { updateMyPatientProfileMiddleware } from "./patient.middlewares";
import { PatientValidation } from "./patient.validation";
import { checkAuth } from "../../middleware/checkAuths";
import { multerUpload } from "../../../config/multer.config";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.patch("/update-my-profile",
    checkAuth(UserRole.PATIENT),
    multerUpload.fields([
        { name : "profilePhoto", maxCount : 1},
        { name : "medicalReports", maxCount : 5}
    ]),

    updateMyPatientProfileMiddleware,
    validateRequest(PatientValidation.updatePatientProfileZodSchema),
    PatientController.updateMyProfile
)

export const PatientRoutes = router;