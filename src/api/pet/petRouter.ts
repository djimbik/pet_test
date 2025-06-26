import {OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import express, {type Router} from "express";

import {createApiResponse} from "@/api-docs/openAPIResponseBuilders";
import {CreatePetSchema, PetSchema} from "@/api/pet/petModel";
import {validateRequest} from "@/common/utils/httpHandlers";
import {petController} from "./petController";

export const petRegistry = new OpenAPIRegistry();
export const petRouter: Router = express.Router();

petRegistry.register("Pet", PetSchema);

petRegistry.registerPath({
    method: "get",
    path: "/pet",
    tags: ["Pet"],
    responses: createApiResponse(PetSchema, "Success"),
});
petRouter.get("/", petController.getPet);

petRegistry.registerPath({
    method: "post",
    path: "/pet",
    tags: ["Pet"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreatePetSchema.shape.body,
                },
            },
        },
    },
    responses: createApiResponse(CreatePetSchema, "Pet created"),
});
petRouter.post("/", validateRequest(CreatePetSchema), petController.createPet);

petRegistry.registerPath({
    method: "post",
    path: "/pet/feed",
    tags: ["Pet"],
    responses: createApiResponse(PetSchema, "Pet fed"),
});
petRouter.post("/feed", petController.feedPet);

petRegistry.registerPath({
    method: "post",
    path: "/pet/heal",
    tags: ["Pet"],
    responses: createApiResponse(PetSchema, "Pet healed"),
});
petRouter.post("/heal", petController.healPet);

petRegistry.registerPath({
    method: "post",
    path: "/pet/play",
    tags: ["Pet"],
    responses: createApiResponse(PetSchema, "Pet played with"),
});
petRouter.post("/play", petController.playPet);