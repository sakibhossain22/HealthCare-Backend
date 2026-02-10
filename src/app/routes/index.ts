import { Router } from "express"
import { specialityRouter } from "../modules/speciality/speciality.routes"
import { authRouter } from "../modules/auth/auth.routes"

const router = Router()

router.use('/specialties', specialityRouter)
router.use('/auth', authRouter)

export const indexRoutes = router