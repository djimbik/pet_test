import {Pet} from "../petModel";
import {v4 as uuid} from "uuid";

export function createNewPet(name: string): Pet {
    const now = new Date();
    return {
        id: uuid(),
        name,
        age: 0,
        health: 100,
        hunger: 0,
        mood: 100,
        status: "alive",
        createdAt: now,
        updatedAt: now,
    };
}