import { Response } from "express"
interface IResponse<T> {
    httpStatusCode?: number,
    success: boolean,
    message: string,
    data?: T,
}
export const sendResponse = <T>(res: Response, responseData: IResponse<T>) => {
    const { httpStatusCode, success, message, data } = responseData
    res.status(httpStatusCode || 200).json({
        success,
        message,
        data
    })
}