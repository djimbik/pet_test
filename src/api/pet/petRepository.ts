import type {Pet} from "@/api/pet/petModel";

let currentPet: Pet | null = null;

export class PetRepository {
    async get(): Promise<Pet | null> {
        return currentPet;
    }

    async save(pet: Pet): Promise<Pet> {
        currentPet = pet;
        return pet;
    }

    async clear(): Promise<void> {
        currentPet = null;
    }
}
