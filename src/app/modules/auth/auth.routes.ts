import { Router } from "express"
import { authController } from "./auth.controller"
import { checkAuth } from "../../middleware/checkAuths"
import { UserRole } from "../../../generated/prisma/enums"
const router = Router()

router.get('/me', checkAuth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN), authController.getMe)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh-token', authController.getNewToken)

export const authRouter = router