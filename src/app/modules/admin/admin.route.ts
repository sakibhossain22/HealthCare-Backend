import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminController } from "./admin.controller";
import { updateAdminZodSchema } from "./admin.validation";
import { UserRole } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuths";

const router = Router();

router.get("/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    AdminController.getAllAdmins);
router.get("/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    AdminController.getAdminById);
router.patch("/:id",
    checkAuth(UserRole.SUPER_ADMIN),
    validateRequest(updateAdminZodSchema), AdminController.updateAdmin);
router.delete("/:id",
    checkAuth(UserRole.SUPER_ADMIN),
    AdminController.deleteAdmin);

router.patch("/change-user-status",
    checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    AdminController.changeUserStatus);
router.patch("/change-user-role",
    checkAuth(UserRole.SUPER_ADMIN),
    AdminController.changeUserRole);


export const AdminRoutes = router;