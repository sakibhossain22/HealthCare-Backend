import { Router } from "express"
import { specialityController } from "./speciality.controller"
import { checkAuth } from "../../middleware/checkAuths"
import { UserRole } from "../../../generated/prisma/enums"
const router = Router()

router.get('/', specialityController.getAllSpeciality)
router.post('/', checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), specialityController.createSpeciality)
router.delete('/:id', checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), specialityController.deleteSpeciality)


export const specialityRouter = router