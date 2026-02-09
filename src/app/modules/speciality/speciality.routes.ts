import { Router } from "express"
import { specialityController } from "./speciality.controller"
const router = Router()

router.get('/', specialityController.getAllSpeciality)
router.post('/', specialityController.createSpeciality)
router.delete('/:id', specialityController.deleteSpeciality)


export const specialityRouter = router