import { UserStatus } from "../../../generated/prisma/enums"
import { auth } from "../../lib/auth"

interface RegisterData {
    name: string,
    email: string,
    password: string
}

interface ILogin {
    email: string,
    password: string
}
const register = async (data: RegisterData) => {
    const { name, email, password } = data
    const result = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    })
    return result
}
const login = async (payload: ILogin) => {
    const { email, password } = payload
    const result = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
    if (result.user.status === UserStatus.BLOCKED) {
        throw new Error("Your account is blocked. Please contact support.")
    }
    if (result.user.status === UserStatus.DELETED) {
        throw new Error("Your account is deleted. Please contact support.")
    }
    return result
}
export const authServices = {
    register,
    login
}