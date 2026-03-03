import express from 'express';
import { UserRole } from '../../../generated/prisma/browser';
import { StatsController } from './stats.controller';
import { checkAuth } from '../../middleware/checkAuths';

const router = express.Router();

router.get(
    '/',
    checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    StatsController.getDashboardStatsData
)


export const StatsRoutes = router;