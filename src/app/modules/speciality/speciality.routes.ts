import { Router } from "express"
import { specialityController } from "./speciality.controller"
import { checkAuth } from "../../middleware/checkAuths"
import { UserRole } from "../../../generated/prisma/enums"
import { multerUpload } from "../../../config/multer.config"
import { validateRequest } from "../../middleware/validateRequest"
import { specialityValidation } from "./speciality.validate"
const router = Router()

router.get('/', specialityController.getAllSpeciality)
router.post('/', 
    // checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    multerUpload.single("file"),
    validateRequest(specialityValidation.createSpecialityZod),
    specialityController.createSpeciality)
router.delete('/:id', checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), specialityController.deleteSpeciality)


export const specialityRouter = router