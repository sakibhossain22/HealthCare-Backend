import { Router } from "express"
import { authController } from "./auth.controller"
import { checkAuth } from "../../middleware/checkAuths"
import { UserRole } from "../../../generated/prisma/enums"
const router = Router()

router.get('/me', checkAuth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN), authController.getMe)
router.post('/change-password', checkAuth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN), authController.changePassword)
router.post('/logout', checkAuth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN), authController.logoutUser)

router.post('/register', authController.register)
router.post('/login', authController.login)

router.post('/refresh-token', authController.getNewToken)
router.post('/verify-email', authController.verifyEmail)

router.post('/forget-password', authController.forgetPassword)
router.post('/reset-password', authController.resetPassword)

router.post('/login/google', authController.googleLogin)
router.post('/google/success', authController.googleLoginSuccess)
router.post('/oauth/error', authController.handleOauthError)

export const authRouter = router