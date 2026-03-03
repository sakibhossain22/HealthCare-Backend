import express from 'express';
import { UserRole } from '../../../generated/prisma/enums';
import { validateRequest } from '../../middleware/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
import { checkAuth } from '../../middleware/checkAuths';

const router = express.Router();

router.get('/', ReviewController.getAllReviews);

router.post(
    '/',
    checkAuth(UserRole.PATIENT),
    validateRequest(ReviewValidation.createReviewZodSchema),
    ReviewController.giveReview
);

router.get('/my-reviews', checkAuth(UserRole.PATIENT, UserRole.DOCTOR), ReviewController.myReviews);

router.patch('/:id', checkAuth(UserRole.PATIENT), validateRequest(ReviewValidation.updateReviewZodSchema), ReviewController.updateReview);

router.delete('/:id', checkAuth(UserRole.PATIENT), ReviewController.deleteReview);




export const ReviewRoutes = router;