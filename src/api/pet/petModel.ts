import {extendZodWithOpenApi} from "@asteasolutions/zod-to-openapi";
import {z} from "zod";

extendZodWithOpenApi(z);

export const PetStatusEnum = z.enum(["alive", "sick", "dead"]);

export type PetStatus = z.infer<typeof PetStatusEnum>;
export type Pet = z.infer<typeof PetSchema>;
export type CreatePetInput = z.infer<typeof CreatePetSchema>["body"];

export const PetSchema = z.object({
    id: z.string(),
    name: z.string(),
    age: z.number(),
    health: z.number().min(0).max(100),
    hunger: z.number().min(0).max(100),
    mood: z.number().min(0).max(100),
    status: PetStatusEnum,
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreatePetSchema = z.object({
    body: z.object({
        name: z.string(),
    }),
});