import {Pet} from "@/api/pet/petModel";
import {updateMood} from "@/api/pet/utils/updateMood";
import {checkStatus} from "@/api/pet/utils/checkStatus";

export function applyTick(pet: Pet): Pet {
    const newAge = pet.age + 1;
    const hunger = Math.min(100, pet.hunger + 3);
    const health = Math.max(0, pet.health - (hunger > 70 ? 5 : 2));
    const mood = updateMood({...pet, health, hunger});
    const status = checkStatus({...pet, health, hunger});

    return {
        ...pet,
        age: newAge,
        health,
        hunger,
        mood,
        status,
        updatedAt: new Date(),
    };
}