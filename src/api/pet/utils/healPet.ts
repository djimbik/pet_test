import {Pet} from "@/api/pet/petModel";
import {finalizeState} from "@/api/pet/utils/finalizeState";

export function healPet(pet: Pet): Pet {
    if (pet.status === "dead") {
        throw new Error("Pet is dead");
    }

    const health = Math.min(100, pet.health + 20);
    const hunger = Math.min(100, pet.hunger + 10);

    return finalizeState({...pet, health, hunger});
}