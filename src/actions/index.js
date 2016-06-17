export const START_GAME = 'START_GAME';
export const TIME_TICK = 'TIME_TICK';
export const BOX_ACTIVE = 'BOX_ACTIVE';
export const BOX_INACTIVE = 'BOX_INACTIVE';
export const WINDOW_RESIZE = 'WINDOW_RESIZE';

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

export function boxActive(id) {
    return {
        type: BOX_ACTIVE,
        id: id
    };
}

export function boxInactive(id) {
    return {
        type: BOX_INACTIVE,
        id: id
    };
}

export function windowResize() {
    return {
        type: WINDOW_RESIZE
    };
}
