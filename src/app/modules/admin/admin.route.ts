import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuths";
import { AdminController } from "./admin.controller";
import { UserRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { updateAdminZodSchema } from "./admin.validation";

const router = Router();

router.get("/", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), AdminController.getAllAdmins);
router.get("/:id", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), AdminController.getAdminById);
router.patch("/:id", checkAuth(UserRole.SUPER_ADMIN), validateRequest(updateAdminZodSchema), AdminController.updateAdmin);
router.delete("/:id", checkAuth(UserRole.SUPER_ADMIN), AdminController.deleteAdmin);

export const AdminRoutes = router;