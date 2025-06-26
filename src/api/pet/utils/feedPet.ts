import {Pet} from "@/api/pet/petModel";
import {finalizeState} from "@/api/pet/utils/finalizeState";

export function feedPet(pet: Pet): Pet {
    if (pet.status === "dead") {
        throw new Error("Pet is dead");
    }

    const hunger = Math.max(0, pet.hunger - 30);
    const mood = Math.min(100, pet.mood + 10);

    return finalizeState({...pet, hunger, mood});
}