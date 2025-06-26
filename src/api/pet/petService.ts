import {StatusCodes} from "http-status-codes";

import {CreatePetInput, Pet} from "@/api/pet/petModel";
import {PetRepository} from "@/api/pet/petRepository";
import {ServiceResponse} from "@/common/models/serviceResponse";
import {logger} from "@/server";
import {createNewPet} from "@/api/pet/utils/petFactory";
import {feedPet} from "@/api/pet/utils/feedPet";
import {healPet} from "@/api/pet/utils/healPet";
import {playWithPet} from "@/api/pet/utils/playWithPet";
import {applyTick} from "@/api/pet/utils/applyTick";
import {startPetTick} from "@/api/pet/utils/petTickManager";

export class PetService {
    private petRepository: PetRepository;

    constructor(repository: PetRepository = new PetRepository()) {
        this.petRepository = repository;
    }

    async find(): Promise<ServiceResponse<Pet | null>> {
        try {
            const pet = await this.petRepository.get();
            if (!pet) {
                return ServiceResponse.failure("Pet not found", null, StatusCodes.NOT_FOUND);
            }
            return ServiceResponse.success("Pet found", pet);
        } catch (ex) {
            const errorMessage = `Find Pet Error: ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("Failed to find pet", null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async create(input: CreatePetInput): Promise<ServiceResponse<Pet | null>> {
        try {
            const existingPet = await this.petRepository.get();
            if (existingPet) {
                return ServiceResponse.failure("Pet already exists", null, StatusCodes.CONFLICT);
            }
            const newPet = createNewPet(input.name)
            const pet = await this.petRepository.save(newPet);

            startPetTick();

            return ServiceResponse.success("Pet created", pet, StatusCodes.CREATED);
        } catch (ex) {
            const errorMessage = `Create Pet Error: ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("Failed to create pet", null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async feed(): Promise<ServiceResponse<Pet | null>> {
        return this.modify("feed", feedPet);
    }

    async heal(): Promise<ServiceResponse<Pet | null>> {
        return this.modify("heal", healPet);
    }

    async play(): Promise<ServiceResponse<Pet | null>> {
        return this.modify("play", playWithPet);
    }

    async tick(): Promise<Pet | null> {
        try {
            const pet = await this.petRepository.get();
            if (!pet || pet.status === "dead") {
                return null;
            }

            const updated = applyTick(pet);
            return this.petRepository.save(updated);
        } catch (ex) {
            logger.error("Tick error:", ex);
            return null;
        }
    }

    private async modify(
        action: string,
        actionFn: (pet: Pet) => Pet
    ): Promise<ServiceResponse<Pet | null>> {
        try {
            const pet = await this.petRepository.get();
            if (!pet) {
                return ServiceResponse.failure("Pet not found", null, StatusCodes.NOT_FOUND);
            }
            if (pet.status === "dead") {
                return ServiceResponse.failure("Pet is dead", pet, StatusCodes.CONFLICT);
            }

            const updated = actionFn(pet);
            const saved = await this.petRepository.save(updated);

            return ServiceResponse.success(`Pet ${action}ed`, saved);
        } catch (err) {
            logger.error(`Pet ${action} error:`, err);
            return ServiceResponse.failure(`Pet ${action} failed`, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export const petService = new PetService();
