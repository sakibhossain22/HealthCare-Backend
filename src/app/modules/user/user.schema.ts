import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
    password: z.string("Password is required"),
    doctor: z.object({
        name: z.string("Name is required"),
        email: z.string("Email is required").email("Invalid email address"),
        contactNumber: z.string("Contact number is required"),
        address: z.string("Address is required"),
        experience: z.number("Experience is required"),
        gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender Must be either MALE or FEMALE"),
        appointmentFee: z.number("Appointment fee is required"),
        qualification: z.string("Qualification is required"),
        currentWorkPlace: z.string("Current workplace is required"),
        designation: z.string("Designation is required"),
    }),
    specialities: z.array(z.uuid(), "At least one speciality is required").min(1, "At least one speciality is required")
})