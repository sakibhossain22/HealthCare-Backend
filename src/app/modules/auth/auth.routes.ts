import { Router } from "express"
import { authController } from "./auth.controller"
import { checkAuth } from "../../middleware/checkAuths"
import { UserRole } from "../../../generated/prisma/enums"
const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', checkAuth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN), authController.getMe)

export const authRouter = router