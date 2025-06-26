import {Pet} from "@/api/pet/petModel";
import {finalizeState} from "@/api/pet/utils/finalizeState";

export function playWithPet(pet: Pet): Pet {
    if (pet.status === "dead") throw new Error("Pet is dead");

    const mood = Math.min(100, pet.mood + 15);
    const hunger = Math.min(100, pet.hunger + 5);

    return finalizeState({...pet, mood, hunger});
}