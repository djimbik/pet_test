import {Pet} from "@/api/pet/petModel";

export function updateMood(pet: Pet): number {
    return Math.max(0, Math.min(100, Math.round((pet.health + (100 - pet.hunger)) / 2)))
}