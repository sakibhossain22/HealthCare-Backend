import { Router } from "express"
import { specialityRouter } from "../modules/speciality/speciality.routes"
import { authRouter } from "../modules/auth/auth.routes"
import { userRouter } from "../modules/user/user.routes"
import { doctorRouter } from "../modules/doctor/doctor.routes"
import { AdminRoutes } from "../modules/admin/admin.route"
import { scheduleRoutes } from "../modules/schedule/schedule.route"
import { DoctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.route"
import { appointmentRoutes } from "../modules/appoinment/appointment.route"

const router = Router()

router.use('/specialties', specialityRouter)
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/doctors', doctorRouter)
router.use("/admins", AdminRoutes)
router.use("/doctor-schedule", DoctorScheduleRoutes)
router.use("/schedules", scheduleRoutes)
router.use("/appointments", appointmentRoutes)

export const indexRoutes = router