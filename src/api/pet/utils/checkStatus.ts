import {Pet, PetStatus} from "@/api/pet/petModel";

export function checkStatus(pet: Pet): PetStatus {
    if (pet.health <= 0 || pet.hunger >= 100) {
        return "dead";
    }
    if (pet.health <= 30) {
        return "sick";
    }
    return "alive"
}