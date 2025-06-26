import type {Request, RequestHandler, Response} from "express";

import {petService} from "@/api/pet/petService";

class PetController {
    public getPet: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await petService.find();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public createPet: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await petService.create(_req.body);
        res.status(serviceResponse.statusCode).send(serviceResponse);
    }

    public feedPet: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await petService.feed();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public healPet: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await petService.heal();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

    public playPet: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await petService.play();
        res.status(serviceResponse.statusCode).send(serviceResponse);
    };

}

export const petController = new PetController();
