import { z } from "zod";

export const AddLessonSchema = z.object({
    title: z.string().min(2, { message: "Title too short." }),
    duration: z.number({ message: "Duration must be a number." }).min(1, { message: "Duration needs to be longer." }),
    lessons: z.array(z.string().min(2, { message: "Lesson cannot be empty." }))
        .min(1, { message: "At least one lesson is required." })
})

export type AddLessonSchemaType = z.infer<typeof AddLessonSchema>;