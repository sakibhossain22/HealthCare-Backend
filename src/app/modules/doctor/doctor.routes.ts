import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuths";
import { UserRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";

const router = Router()

router.get("/", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), doctorController.getAllDoctors);
router.get("/:id", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), doctorController.getDoctorById);
router.patch("/:id", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(updateDoctorZodSchema), doctorController.updateDoctor);
router.delete("/:id", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), doctorController.deleteDoctor);


export const doctorRouter = router