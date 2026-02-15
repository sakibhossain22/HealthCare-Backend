import { Router } from "express"
import { specialityRouter } from "../modules/speciality/speciality.routes"
import { authRouter } from "../modules/auth/auth.routes"
import { userRouter } from "../modules/user/user.routes"
import { doctorRouter } from "../modules/doctor/doctor.routes"

const router = Router()

router.use('/specialties', specialityRouter)
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/doctors', doctorRouter)

export const indexRoutes = router