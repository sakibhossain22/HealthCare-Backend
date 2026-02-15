import { catchAsync } from "../../shared/catchAsync";
import { Response, Request } from "express"
import { doctorServices } from "./doctor.services";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllDoctors = catchAsync(
    async (req: Request, res: Response) => {
        const result = await doctorServices.getAllDoctors()
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Doctors Fetched Successfully",
            data: result
        })
    }
)

export const doctorController = {
    getAllDoctors
}