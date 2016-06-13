export const START_GAME = 'START_GAME';
export const TIME_TICK = 'TIME_TICK';

export function startGame() {
    return {
        type: START_GAME
    };
}

export function timeTick() {
    return {
        type: TIME_TICK
    };
}
