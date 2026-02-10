import { auth } from "../../lib/auth"

interface RegisterData {
    name: string,
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

export const authServices = {
    register
}