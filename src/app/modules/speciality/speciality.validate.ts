import z from "zod";

const createSpecialityZod = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
})

export const specialityValidation = {
    createSpecialityZod
}