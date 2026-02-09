import { Router } from "express"
import { specialityRouter } from "../modules/speciality/speciality.routes"

const router = Router()

router.use('/specialties', specialityRouter)

export const indexRoutes = router