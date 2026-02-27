import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { checkAuth } from "../../middleware/checkAuths";


const router = Router();

router.post("/create-my-doctor-schedule",
    checkAuth(UserRole.DOCTOR),
    DoctorScheduleController.createMyDoctorSchedule);
router.get("/my-doctor-schedules", checkAuth(UserRole.DOCTOR), DoctorScheduleController.getMyDoctorSchedules);
router.get("/", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), DoctorScheduleController.getAllDoctorSchedules);
router.get("/:doctorId/schedule/:scheduleId", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), DoctorScheduleController.getDoctorScheduleById);
router.patch("/update-my-doctor-schedule",
    checkAuth(UserRole.DOCTOR),
    DoctorScheduleController.updateMyDoctorSchedule);
router.delete("/delete-my-doctor-schedule/:id", checkAuth(UserRole.DOCTOR), DoctorScheduleController.deleteMyDoctorSchedule);

export const DoctorScheduleRoutes = router;