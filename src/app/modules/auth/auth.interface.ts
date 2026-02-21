export interface RegisterData {
    name: string,
    email: string,
    password: string
}

export interface ILogin {
    email: string,
    password: string
}
export interface IChangePasswordPayload {
    currentPassword: string,
    newPassword: string
}