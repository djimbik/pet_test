import {Pet} from "@/api/pet/petModel";
import {updateMood} from "@/api/pet/utils/updateMood";
import {checkStatus} from "@/api/pet/utils/checkStatus";

export function finalizeState(pet: Pet): Pet {
    const mood = updateMood(pet);
    const status = checkStatus(pet);
    return {...pet, mood, status, updatedAt: new Date()};
}