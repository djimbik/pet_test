import {petService} from "@/api/pet/petService";
import {logger} from "@/server";

let tickInterval: NodeJS.Timeout | null = null;

export function startPetTick(intervalMs = 60_000): void {
    if (tickInterval) {
        return;
    }

    tickInterval = setInterval(async () => {
        const pet = await petService.tick();

        if (!pet) {
            logger.warn("Pet not found or dead.");
            return;
        }
        if (pet.status === "dead") {
            logger.info("Pet died. Stopping tick.");
            stopPetTick();
        } else {
            logger.debug(
                `
                Tick: 
                age=${pet.age}, 
                health=${pet.health}, 
                hunger=${pet.hunger}, 
                mood=${pet.mood}, 
                status=${pet.status}
                `
            );
        }
    }, intervalMs);

    logger.info(`Tick started. Interval: ${intervalMs / 1000} sec`);
}

export function stopPetTick(): void {
    if (tickInterval) {
        clearInterval(tickInterval);
        tickInterval = null;
        logger.info("Tick stopped.");
    }
}
